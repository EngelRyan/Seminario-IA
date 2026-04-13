# Checklist – Validador de Aposentadoria (RGPS)

## 1. Requisito Funcional RF-001
- [x] Sistema permite validar direito à aposentadoria no RGPS.
- [x] Considera **sexo**, **idade** e **tempo de contribuição** como entradas.

## 2. Interface (Wireframe)
- [x] Título "Validador de Aposentadoria (RGPS)".
- [x] Campo **Sexo** com opções "Masculino" e "Feminino".
- [x] Campo numérico **Idade**.
- [x] Campo numérico **Tempo de Contribuição (anos)**.
- [x] Botão **Validar**.
- [x] Layout tipo card centralizado, semelhante ao wireframe.

## 3. Regras de Negócio
### 3.1 Mulheres
- [x] Idade mínima: **62 anos**.
- [x] Tempo de contribuição mínimo: **15 anos**.
- [x] Quando ambos os critérios são atendidos → **"Aposentadoria aprovada."**.
- [x] Quando apenas idade não é atendida → mensagem com requisito de idade mínima.
- [x] Quando apenas tempo não é atendido → mensagem com requisito de tempo mínimo.

### 3.2 Homens
- [x] Idade mínima: **65 anos**.
- [x] Tempo de contribuição mínimo: **20 anos**.
- [x] Quando ambos os critérios são atendidos → **"Aposentadoria aprovada."**.
- [x] Quando apenas idade não é atendida → mensagem com requisito de idade mínima.
- [x] Quando apenas tempo não é atendido → mensagem com requisito de tempo mínimo.

## 4. Mensagens para o Usuário
- [x] Mensagem de sucesso: **"Aposentadoria aprovada."**.
- [x] Mensagem de negação inclui o requisito não atendido:
  - [x] "Aposentadoria negada. Requisito não atendido: idade mínima (62 anos)."
  - [x] "Aposentadoria negada. Requisito não atendido: idade mínima (65 anos)."
  - [x] "Aposentadoria negada. Requisito não atendido: tempo de contribuição mínimo (15 anos)."
  - [x] "Aposentadoria negada. Requisito não atendido: tempo de contribuição mínimo (20 anos)."
- [x] Mensagens de erro para dados inválidos (entradas erradas) são visuais e separadas das mensagens de aprovação/negação.

## 5. Restrições de Entrada
- [x] **Idade** e **tempo de contribuição** são numéricos inteiros.
- [x] Não permite valores negativos.
- [x] Limites máximos aplicados:
  - [x] Idade ≤ **200**.
  - [x] Tempo de contribuição ≤ **100**.
- [x] Em caso de valor inválido (vazio, não numérico, negativo ou acima do limite):
  - [x] Exibe mensagem de erro específica.
  - [x] Não executa a validação de aposentadoria.

## 6. Testes Automatizados
- [x] Página de testes em `tests/test-runner.html`.
- [x] Script de testes em `tests/aposentadoria-tests.js` chamando `validarAposentadoria`.
- [x] Cobertura dos 4 casos de exemplo do caso de uso:
  - [x] Mulher, 63 anos, 18 anos de contribuição → aprovada.
  - [x] Mulher, 60 anos, 20 anos de contribuição → negada por idade.
  - [x] Homem, 66 anos, 18 anos de contribuição → negada por tempo.
  - [x] Homem, 68 anos, 25 anos de contribuição → aprovada.
- [x] Casos de borda com valores exatamente nos mínimos (62/15 para mulher, 65/20 para homem).

## 7. Publicação (GitHub Pages)
- [x] Branch `gh-pages` criada a partir da `main`.
- [ ] GitHub Pages habilitado em **Settings > Pages** (ação manual).
- [ ] Verificar acesso pela URL: `https://engelryan.github.io/Seminario-IA/` após a publicação.

> Use este checklist para apresentar o que foi implementado (o que já está marcado) e o que depende apenas de configuração no GitHub (itens finais de publicação).