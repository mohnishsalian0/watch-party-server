const express = require("express");
const socketio = require("socket.io");

const registerSocketHandlers = require("./socket");

const app = express();

const server = app.listen(3000);

const io = socketio(server, {
  cors: {
    origin: ["chrome-extension://gkfbghjjaclplmodfmoamcabnodmihap"],
  },
});

registerSocketHandlers(io);
