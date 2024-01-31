const socket = io();

document.getElementById('formulario').addEventListener('submit', (e) => {
  e.preventDefault();
  const codigo = id.value;
  const titulo = title.value;
  const precio = price.value;
  const descripcion = description.value;
  const unidades = stock.value;
  if (!codigo || !titulo || !descripcion || !precio || !unidades) {
    console.log('Todos los campos son obligatorios');
    return;
  }
  socket.emit('new-product', {
    id: codigo,
    title: titulo,
    description: descripcion,
    price: precio,
    stock: unidades,
  });
});
let user;
let chatBox = document.getElementById('chatBox');
Swal.fire({
  title: 'Identificate',
  input: 'text',
  text: 'Ingresa tu usuario para identificarte en el chat',
  inputValidator: (value) => {
    return !value && 'Necesitas escribir un nombre de usuario para continuar';
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit('login', user);
});

chatBox.addEventListener('keyup', (evento) => {
  if (evento.key === 'Enter') {
    if (chatBox.value.trim().length > 0) {
      socket.emit('message', { user, message: chatBox.value });
      chatBox.value = '';
    }
  }
});

socket.on('messageLogs', (data) => {
  let log = document.getElementById('messageLogs');
  let messages = '';
  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} <br>`;
  });
  log.innerHTML = messages;
});

socket.on('register', (data) => {
  Swal.fire({
    title: 'Se registro un nuevo usuario',
    text: `El nombre del usuario es ${data}`,
    icon: 'success',
    toast: true,
  });
});
