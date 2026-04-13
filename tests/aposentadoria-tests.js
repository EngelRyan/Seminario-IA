// Testes simples em JavaScript puro para a função validarAposentadoria.
// Para executar, abra tests/test-runner.html no navegador.

function executarTestesAposentadoria() {
  const saida = document.getElementById("saida-testes");

  if (typeof validarAposentadoria !== "function") {
    saida.textContent = "Função validarAposentadoria não encontrada. Verifique se scripts/app.js foi carregado.";
    return;
  }

  const casos = [
    {
      descricao: "Caso 1: Mulher, 63 anos, 18 anos de contribuição → aprovada",
      entrada: { sexo: "Feminino", idade: 63, tempo: 18 },
      esperado: { aprovada: true },
    },
    {
      descricao:
        "Caso 2: Mulher, 60 anos, 20 anos de contribuição → negada por idade",
      entrada: { sexo: "Feminino", idade: 60, tempo: 20 },
      esperado: { aprovada: false, motivo: "idade", idadeMinima: 62 },
    },
    {
      descricao:
        "Caso 3: Homem, 66 anos, 18 anos de contribuição → negada por tempo",
      entrada: { sexo: "Masculino", idade: 66, tempo: 18 },
      esperado: { aprovada: false, motivo: "tempo", tempoMinimo: 20 },
    },
    {
      descricao: "Caso 4: Homem, 68 anos, 25 anos de contribuição → aprovada",
      entrada: { sexo: "Masculino", idade: 68, tempo: 25 },
      esperado: { aprovada: true },
    },
    // Casos de borda
    {
      descricao:
        "Borda: Mulher exatamente com 62 anos e 15 anos de contribuição → aprovada",
      entrada: { sexo: "Feminino", idade: 62, tempo: 15 },
      esperado: { aprovada: true },
    },
    {
      descricao:
        "Borda: Homem exatamente com 65 anos e 20 anos de contribuição → aprovada",
      entrada: { sexo: "Masculino", idade: 65, tempo: 20 },
      esperado: { aprovada: true },
    },
  ];

  let passou = 0;
  let falhou = 0;
  const linhas = [];

  casos.forEach((caso, indice) => {
    const { sexo, idade, tempo } = caso.entrada;
    const resultado = validarAposentadoria(sexo, idade, tempo);

    let ok = true;

    if (resultado.aprovada !== caso.esperado.aprovada) {
      ok = false;
    }

    if (caso.esperado.motivo && resultado.motivo !== caso.esperado.motivo) {
      ok = false;
    }

    if (
      typeof caso.esperado.idadeMinima === "number" &&
      resultado.idadeMinima !== caso.esperado.idadeMinima
    ) {
      ok = false;
    }

    if (
      typeof caso.esperado.tempoMinimo === "number" &&
      resultado.tempoMinimo !== caso.esperado.tempoMinimo
    ) {
      ok = false;
    }

    if (ok) {
      passou++;
      linhas.push(`✔ [OK] (${indice + 1}) ${caso.descricao}`);
    } else {
      falhou++;
      linhas.push(
        `✘ [FALHOU] (${indice + 1}) ${caso.descricao}\n    Esperado: ${JSON.stringify(
          caso.esperado
        )}\n    Obtido:   ${JSON.stringify(resultado)}`
      );
    }
  });

  linhas.unshift(`Total de testes: ${casos.length} (Passaram: ${passou}, Falharam: ${falhou})`);

  saida.textContent = linhas.join("\n");
}

window.addEventListener("DOMContentLoaded", executarTestesAposentadoria);
