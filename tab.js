function saveUrl(socket, payload, rooms) {
  const { userId, room } = socket.user;
  const { url } = payload;

  if (rooms[room].host.id == userId) rooms[room].tab = { url };
}

function redirectToUrl(payload) {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;
  const { url } = payload;

  socket.to(room).emit("tab:redirect", {
    userId,
    userName,
    userAvatar,
    url,
  });
}

module.exports = { saveUrl, redirectToUrl };
