function playVideo() {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;

  socket.to(room).volatile.emit("video:play", {
    userId,
    userName,
    userAvatar,
  });
}

function pauseVideo() {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;

  socket.to(room).volatile.emit("video:pause", {
    userId,
    userName,
    userAvatar,
  });
}

function seekVideo(payload) {
  const socket = this;
  const { userId, userName, userAvatar, room } = socket.user;
  const { timestamp } = payload;

  socket.to(room).volatile.emit("video:seek", {
    timestamp,
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
