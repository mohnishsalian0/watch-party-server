const express = require("express");

const io = require("./socket");

const router = express.Router();

router.post("/create-room/:room", (req, res) => {
  console.log(req.body);
  const room = req.params.room;
  const userName = req.body.userName;
  const userAvatar = req.body.userAvatar;
  const userId = Math.random().toString(36).substring(2, 10);
  console.log(`Creating room with name: ${room}`);
  console.log(`Making user ${userName} the host`);
  res.status(201).json({
    message: "Room created successfully!",
    room: room,
    hostId: userId,
    hostName: userName,
    timestamp: new Date().toISOString(),
  });
});

router.get("/:room", (req, res) => {
  const room = req.params.room;
  console.log(`Checking if room with name ${room} exists`);
  res.status(200).json({
    message: `Checking if room with name ${room} exists`,
  });
});

router.patch("/change-host/:room", (req, res) => {
  const room = req.params.room;
  const userId = req.body.userId;
  console.log(`Making user ${userId} the host of the room: ${room}`);
  res.status(200).json({
    message: `Making user ${userId} the host of the room: ${room}`,
  });
});

router.delete("/delete/:room", (req, res) => {
  const room = req.params.room;
  console.log(`Deleting room: ${room}`);
  res.send(`Deleting room: ${room}`);
  res.status(200).json({
    message: `Deleting room: ${room}`,
  });
});

module.exports = router;
