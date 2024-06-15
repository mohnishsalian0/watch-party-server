const { joinRoom, leaveRoom } = require("./room");
const { playVideo, pauseVideo, seekVideo } = require("./remote");
const { sendMessage, sendReaction } = require("./chat");

const rooms = { room1: { users: {} } };
const users = {};

function registerSocketHandlers(io) {
  io.use((socket, next) => {
    const { userId, userName, userAvatar, room } = socket.handshake.auth;
    if (!userId || !userName || !userAvatar || !room)
      throw new Error(
        `User data or room missing: {userId: ${userId}, userName: ${userName}, userAvatar: ${userAvatar}, room: ${room}}`,
      );
    socket.user = socket.handshake.auth;
    next();
  });

  io.on("connection", (socket) => {
    console.log("A user has connected: ", socket.user);
    joinRoom(socket, rooms, users);

    // Handlers for playing, pausing & seeking the video playback
    socket.on("video:play", playVideo);
    socket.on("video:pause", pauseVideo);
    socket.on("video:seek", seekVideo);

    // Handlers for chat
    socket.on("chat:message", sendMessage);
    socket.on("chat:reaction", sendReaction);

    // TODO: if user disconnects and reconnects, find a way to identify them
    socket.on("disconnect", () => {
      console.log("A user has disconnected");
      socket.removeAllListeners();
      leaveRoom(socket, rooms, users);
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  });
}

module.exports = registerSocketHandlers;
