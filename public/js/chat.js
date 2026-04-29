const socket = io();

const chatForm = document.getElementById('chatForm');
const mensajeInput = document.getElementById('mensaje');
const usuarioInput = document.getElementById('usuario');
const messages = document.getElementById('messages');

if (chatForm) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const mensaje = mensajeInput.value.trim();
    const usuario = usuarioInput.value;

    if (mensaje !== '') {
      socket.emit('chatMessage', {
        usuario,
        mensaje
      });

      mensajeInput.value = '';
    }
  });

  socket.on('chatMessage', (data) => {
    const div = document.createElement('div');
    div.classList.add('message');

    div.innerHTML = `
      <strong>${data.usuario}</strong>
      <span>${data.fecha}</span>
      <p>${data.mensaje}</p>
    `;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}