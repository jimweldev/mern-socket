const io = require('socket.io')(8900, {
  cors: {
    pingTimeout: 60000,
    origin: 'http://localhost:5173',
    // credentials: true,
  },
});

let users = [];

const connectUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const disconnectUser = (type, id) => {
  if (type === 'logout') {
    users = users.filter((user) => user.userId !== id);
  } else {
    users = users.filter((user) => user.socketId !== id);
  }
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  socket.on('connectUser', (userId) => {
    connectUser(userId, socket.id);
    io.emit('getUsers', users);
    console.log('connect: ', users);
  });

  socket.on('disconnectUser', (userId) => {
    disconnectUser('logout', userId);
    io.emit('getUsers', users);
    console.log('disconnect: ', users);
  });

  socket.on('disconnect', () => {
    disconnectUser('', socket.id);
    io.emit('getUsers', users);
    console.log('disconnect browser: ', users);
  });
});
