Requisito Funcional: Validação de Aposentadoria no Regime Geral de 
Previdência Social (RGPS)
Identificador: RF-001
Nome: Validação de Requisitos para Aposentadoria
Descrição
O sistema deve permitir a validação do direito à aposentadoria de um usuário com base 
nas regras gerais do Regime Geral de Previdência Social (RGPS). A validação deve 
considerar o sexo do usuário, sua idade e o tempo de contribuição informado.
Entradas
•Sexo: Opções disponíveis: "Masculino" e "Feminino". 
•Idade: Campo numérico para entrada da idade do usuário (valores inteiros). 
•Tempo de Contribuição: Campo numérico para entrada do tempo de contribuição 
em anos (valores inteiros). 
Regras de Negócio
1.Validação da Aposentadoria para Mulheres
•O usuário deve ter 62 anos ou mais de idade. 
•O tempo de contribuição deve ser igual ou superior a 15 anos. 
•Se ambos os critérios forem atendidos, o sistema deve indicar que a usuária 
está apta a se aposentar. 
•Caso contrário, o sistema deve exibir uma mensagem informando que a 
usuária ainda não atende aos critérios e deve indicar qual requisito não foi 
cumprido. 
2.Validação da Aposentadoria para Homens
•O usuário deve ter 65 anos ou mais de idade. 
•O tempo de contribuição deve ser igual ou superior a 20 anos. 
•Se ambos os critérios forem atendidos, o sistema deve indicar que o usuário 
está apto a se aposentar. 
•Caso contrário, o sistema deve exibir uma mensagem informando que o 
usuário ainda não atende aos critérios e deve indicar qual requisito não foi 
cumprido. 
Saídas
•Mensagem "Aposentadoria aprovada" se o usuário atender a todos os critérios. 
•Mensagem "Aposentadoria negada", com a especificação do critério não 
atendido (idade ou tempo de contribuição). 
Exemplo de Funcionamento
Caso 1: Mulher Apta a se Aposentar
•Entrada: Sexo: Feminino, Idade: 63, Tempo de Contribuição: 18 anos. 
•Saída: "Aposentadoria aprovada." 
Caso 2: Mulher Não Apta (Falta de Idade)
•Entrada: Sexo: Feminino, Idade: 60, Tempo de Contribuição: 20 anos. 
•Saída: "Aposentadoria negada. Requisito não atendido: idade mínima (62 anos)." 
Caso 3: Homem Não Apto (Falta de Tempo de Contribuição)
•Entrada: Sexo: Masculino, Idade: 66, Tempo de Contribuição: 18 anos. 
•Saída: "Aposentadoria negada. Requisito não atendido: tempo de contribuição 
mínimo (20 anos)." 
Caso 4: Homem Apto a se Aposentar
•Entrada: Sexo: Masculino, Idade: 68, Tempo de Contribuição: 25 anos. 
•Saída: "Aposentadoria aprovada." 
Restrições
•O sistema deve garantir que a idade e o tempo de contribuição sejam valores 
numéricos inteiros e não negativo, sendo a idade o valor máximo de 200 anos e o 
tempo de contribuição 100 anos. 
•Caso um valor inválido seja informado (ex.: idade negativa, caracteres não 
numéricos), o sistema deve exibir uma mensagem de erro informando que os 
dados são inválidos. 
Prioridade
Alta – funcionalidade essencial para o processo de validação da aposentadoria.
Dependências
Nenhuma.
