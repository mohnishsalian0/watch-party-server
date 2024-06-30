function playVideo(payload) {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;

  socket.to(room).volatile.emit("video:play", {
    ...payload,
    userId,
    userName,
    userAvatar,
  });
}

function pauseVideo(payload) {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;

  socket.to(room).volatile.emit("video:pause", {
    ...payload,
    userId,
    userName,
    userAvatar,
  });
}

function seekVideo(payload) {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;

  socket.to(room).volatile.emit("video:seek", {
    ...payload,
    userId,
    userName,
    userAvatar,
  });
}

module.exports = {
  playVideo,
  pauseVideo,
  seekVideo,
};
