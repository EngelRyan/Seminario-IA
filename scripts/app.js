// Validador de Aposentadoria (RGPS)
// Este arquivo implementa APENAS a validação de ENTRADA dos dados
// (issue #3). As regras de negócio de aposentadoria serão tratadas
// em issues seguintes.

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

  // Se chegou aqui, os dados de entrada são válidos.
  // NÃO aplicamos ainda as regras de negócio de aposentadoria.
  exibirMensagem("Dados de entrada válidos. (Próxima etapa: validar aposentadoria)", "sucesso");

  return {
    sexo,
    idade: resultadoIdade.numero,
    tempoContribuicao: resultadoTempo.numero,
  };
}

function handleValidarClick() {
  validarEntradas();
}

function registrarEventos() {
  const botao = document.getElementById("btn-validar");
  if (botao) {
    botao.addEventListener("click", handleValidarClick);
  }
}

window.addEventListener("DOMContentLoaded", registrarEventos);

console.log("Validador de Aposentadoria (RGPS) - validação de entradas carregada");
