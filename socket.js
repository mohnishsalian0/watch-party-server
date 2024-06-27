const { joinRoom, leaveRoom } = require("./room");
const { playVideo, pauseVideo, seekVideo } = require("./remote");
const { sendMessage, sendReaction } = require("./chat");
const { saveUrl, redirectToUrl } = require("./tab");
const { saveOffer, saveAndSendAnswer, sendNewCandidate } = require("./voice");

const rooms = {};
const users = {};

function validateNewConnection(socket, next) {
  const { userId, userName, userAvatar, room } = socket.handshake.auth;
  if (!userId || !userName || !userAvatar || !room)
    throw new Error(
      `User data or room missing: {userId: ${userId}, userName: ${userName}, userAvatar: ${userAvatar}, room: ${room}}`,
    );
  socket.user = socket.handshake.auth;
  next();
}

function handleDisconnect() {
  const socket = this;
  console.log(
    `[${new Date().toISOString().split("T")[1].split(".")[0]}] A user has disconnected: ${socket.user}`,
  );
  socket.removeAllListeners();
  leaveRoom(socket, rooms, users);
}

function handleAny(event, ...args) {
  console.log(event, args);
}

function registerSocketHandlers(io) {
  io.use(validateNewConnection);

  io.on("connection", (socket) => {
    console.log(
      `[${new Date().toISOString().split("T")[1].split(".")[0]}] A user has connected: ${socket.user}`,
    );
    joinRoom(socket, rooms, users);

    socket.on("video:play", playVideo);
    socket.on("video:pause", pauseVideo);
    socket.on("video:seek", seekVideo);

    socket.on("chat:message", sendMessage);
    socket.on("chat:reaction", sendReaction);

    socket.on("tab:url", (payload) => saveUrl(socket, payload, rooms));
    socket.on("tab:redirect", redirectToUrl);

    socket.on("call:offer", (payload) => saveOffer(socket, payload, rooms));
    socket.on("call:answer", (payload) =>
      saveAndSendAnswer(socket, payload, rooms),
    );
    socket.on("call:newCandidate", (payload) =>
      sendNewCandidate(socket, payload, rooms),
    );

    socket.on("disconnect", handleDisconnect);

    socket.onAny(handleAny);
  });
}

module.exports = registerSocketHandlers;
