function sendMessage(payload) {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;
  const { messageId, messageType, messageContent } = payload;

  socket.to(room).volatile.emit("chat:message", {
    messageId,
    messageType,
    messageContent,
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
