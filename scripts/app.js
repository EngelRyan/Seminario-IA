// Validador de Aposentadoria (RGPS)
// Issue #3: validação de ENTRADA dos dados (já implementada).
// Issue #4: regras de NEGÓCIO de aposentadoria (implementadas abaixo).

const LIMITE_IDADE_MAX = 200;
const LIMITE_TEMPO_MAX = 100;

function obterValoresFormulario() {
  const sexo = document.getElementById("sexo").value;
  const idadeValor = document.getElementById("idade").value.trim();
  const tempoValor = document.getElementById("tempoContribuicao").value.trim();

  return { sexo, idadeValor, tempoValor };
}

function validarNumeroInteiroNaoNegativo(valorTexto) {
  if (valorTexto === "") return { valido: false, motivo: "vazio" };

  // Não permitir caracteres não numéricos
  if (!/^[-+]?\d+$/.test(valorTexto)) {
    return { valido: false, motivo: "naoNumerico" };
  }

  const numero = Number(valorTexto);

  if (!Number.isInteger(numero)) {
    return { valido: false, motivo: "naoInteiro" };
  }

  if (numero < 0) {
    return { valido: false, motivo: "negativo" };
  }

  return { valido: true, numero };
}

function exibirMensagem(texto, tipo) {
  const mensagens = document.getElementById("mensagens");
  mensagens.textContent = texto;
  mensagens.className = "mensagens"; // reseta

  if (tipo === "erro") {
    mensagens.classList.add("mensagem-erro");
  } else if (tipo === "sucesso") {
    mensagens.classList.add("mensagem-sucesso");
  }
}

// -------- Validação de entradas (issue #3) --------

function validarEntradas() {
  const { sexo, idadeValor, tempoValor } = obterValoresFormulario();

  // Sexo obrigatório
  if (!sexo) {
    exibirMensagem("Selecione o sexo.", "erro");
    return null;
  }

  // Idade
  const resultadoIdade = validarNumeroInteiroNaoNegativo(idadeValor);
  if (!resultadoIdade.valido) {
    switch (resultadoIdade.motivo) {
      case "vazio":
        exibirMensagem("Informe a idade.", "erro");
        break;
      case "naoNumerico":
        exibirMensagem("Idade deve conter apenas números inteiros.", "erro");
        break;
      case "naoInteiro":
        exibirMensagem("Idade deve ser um número inteiro.", "erro");
        break;
      case "negativo":
        exibirMensagem("Idade não pode ser negativa.", "erro");
        break;
      default:
        exibirMensagem("Idade inválida.", "erro");
    }
    return null;
  }

  if (resultadoIdade.numero > LIMITE_IDADE_MAX) {
    exibirMensagem(
      `Idade deve ser menor ou igual a ${LIMITE_IDADE_MAX} anos.`,
      "erro"
    );
    return null;
  }

  // Tempo de contribuição
  const resultadoTempo = validarNumeroInteiroNaoNegativo(tempoValor);
  if (!resultadoTempo.valido) {
    switch (resultadoTempo.motivo) {
      case "vazio":
        exibirMensagem("Informe o tempo de contribuição em anos.", "erro");
        break;
      case "naoNumerico":
        exibirMensagem(
          "Tempo de contribuição deve conter apenas números inteiros.",
          "erro"
        );
        break;
      case "naoInteiro":
        exibirMensagem("Tempo de contribuição deve ser um número inteiro.", "erro");
        break;
      case "negativo":
        exibirMensagem("Tempo de contribuição não pode ser negativo.", "erro");
        break;
      default:
        exibirMensagem("Tempo de contribuição inválido.", "erro");
    }
    return null;
  }

  if (resultadoTempo.numero > LIMITE_TEMPO_MAX) {
    exibirMensagem(
      `Tempo de contribuição deve ser menor ou igual a ${LIMITE_TEMPO_MAX} anos.`,
      "erro"
    );
    return null;
  }

  return {
    sexo,
    idade: resultadoIdade.numero,
    tempoContribuicao: resultadoTempo.numero,
  };
}

// -------- Regras de negócio de aposentadoria (issue #4) --------

function validarAposentadoria(sexo, idade, tempoContribuicao) {
  let idadeMinima;
  let tempoMinimo;

  if (sexo === "Feminino") {
    idadeMinima = 62;
    tempoMinimo = 15;
  } else if (sexo === "Masculino") {
    idadeMinima = 65;
    tempoMinimo = 20;
  } else {
    return {
      aprovada: false,
      motivo: "sexoInvalido",
    };
  }

  if (idade >= idadeMinima && tempoContribuicao >= tempoMinimo) {
    return {
      aprovada: true,
    };
  }

  if (idade < idadeMinima) {
    return {
      aprovada: false,
      motivo: "idade",
      idadeMinima,
    };
  }

  if (tempoContribuicao < tempoMinimo) {
    return {
      aprovada: false,
      motivo: "tempo",
      tempoMinimo,
    };
  }

  return {
    aprovada: false,
    motivo: "desconhecido",
  };
}

function processarResultadoAposentadoria(resultado) {
  if (resultado.aprovada) {
    exibirMensagem("Aposentadoria aprovada.", "sucesso");
    return;
  }

  if (resultado.motivo === "idade") {
    exibirMensagem(
      `Aposentadoria negada. Requisito não atendido: idade mínima (${resultado.idadeMinima} anos).`,
      "erro"
    );
    return;
  }

  if (resultado.motivo === "tempo") {
    exibirMensagem(
      `Aposentadoria negada. Requisito não atendido: tempo de contribuição mínimo (${resultado.tempoMinimo} anos).`,
      "erro"
    );
    return;
  }

  if (resultado.motivo === "sexoInvalido") {
    exibirMensagem("Sexo inválido para validação de aposentadoria.", "erro");
    return;
  }

  exibirMensagem("Não foi possível determinar o resultado da aposentadoria.", "erro");
}

// -------- Fluxo principal do botão Validar --------

function handleValidarClick() {
  const dadosValidos = validarEntradas();
  if (!dadosValidos) {
    return; // Mensagem de erro já exibida em validarEntradas
  }

  const resultado = validarAposentadoria(
    dadosValidos.sexo,
    dadosValidos.idade,
    dadosValidos.tempoContribuicao
  );

  processarResultadoAposentadoria(resultado);
}

function registrarEventos() {
  const botao = document.getElementById("btn-validar");
  if (botao) {
    botao.addEventListener("click", handleValidarClick);
  }
}

window.addEventListener("DOMContentLoaded", registrarEventos);

console.log(
  "Validador de Aposentadoria (RGPS) - validação de entradas e regras de negócio carregadas"
);
