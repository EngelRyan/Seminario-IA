# Validador de Aposentadoria (RGPS)

Aplicação web simples para validar se um usuário tem direito à aposentadoria no Regime Geral de Previdência Social (RGPS), com base em:

- Sexo (Masculino/Feminino)
- Idade
- Tempo de contribuição (anos)

## Estado atual

O sistema implementa:

- Formulário de entrada com sexo, idade e tempo de contribuição.
- Validações de entrada (campos obrigatórios, inteiros, não negativos, limites máximos).
- Regras de negócio do caso de uso RF-001 para homens e mulheres.
- Mensagens claras de aprovação ou negação da aposentadoria, incluindo o requisito não atendido.

## Como executar localmente

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` diretamente no navegador (duplo clique ou arrastando para uma aba).

Não é necessário backend ou servidor para rodar a aplicação.

## Como executar os testes automatizados

Os testes automatizados da função de validação de aposentadoria são executados em uma página HTML simples.

1. No navegador, abra o arquivo `tests/test-runner.html`.
2. Os testes serão executados automaticamente ao carregar a página.
3. O resultado (passou/falhou) de cada cenário será exibido na própria página.

Os testes cobrem:

- Os 4 cenários de exemplo do caso de uso.
- Casos de borda com valores exatamente nas idades e tempos mínimos para homens e mulheres.
