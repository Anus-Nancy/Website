export const registerSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    socket.on('join:request', (requestId) => socket.join(`request:${requestId}`));
    socket.on('leave:request', (requestId) => socket.leave(`request:${requestId}`));
  });
};
