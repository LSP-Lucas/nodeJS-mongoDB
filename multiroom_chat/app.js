// importar configurações do servidor
const app = require('./config/server');

// parametrização da porta de escuta
const server = app.listen(3000, function() {
  console.log("Server is ruuning");
});

const io = require('socket.io').listen(server);

// cria a variavel 'io' e passa o valor io para ela, assim fica global
app.set('io', io); 

// criar a conexão por websocket
io.on('connection', function(socket) {
  console.log('Usuário conectou!');

  socket.on('disconnect', function() {
    console.log('Usuário desconectou!');
  });

  socket.on('msgParaServidor', function(data) {

    // Dialogo
    socket.emit('msgParaCliente', { apelido: data.apelido, mesage: data.mesage });

    socket.broadcast.emit('msgParaCliente', { apelido: data.apelido, mesage: data.mesage });

    // Participantes
    if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit('participantesParaCliente', { apelido: data.apelido });

      socket.broadcast.emit('participantesParaCliente', { apelido: data.apelido });
    }
    
  });
});