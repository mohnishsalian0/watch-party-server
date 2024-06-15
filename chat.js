function sendMessage(payload) {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;
  const { message } = payload;

  socket.to(room).volatile.emit("chat:message", {
    message,
    userId,
    userName,
    userAvatar,
  });
}

function sendReaction(payload) {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;
  const { reaction } = payload;

  socket.to(room).volatile.emit("chat:reaction", {
    reaction,
    userId,
    userName,
    userAvatar,
  });
}

module.exports = {
  sendMessage,
  sendReaction,
};
