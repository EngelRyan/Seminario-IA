// Lógica do validador de aposentadoria (RGPS)
// As validações de entrada e regras de negócio serão implementadas
// nas próximas tarefas.

function handleValidarClick() {
  const mensagens = document.getElementById("mensagens");
  mensagens.textContent = "(placeholder) Validação ainda não implementada.";
}

function registrarEventos() {
  const botao = document.getElementById("btn-validar");
  if (botao) {
    botao.addEventListener("click", handleValidarClick);
  }
}

window.addEventListener("DOMContentLoaded", registrarEventos);

console.log("Validador de Aposentadoria (RGPS) - UI carregada");
