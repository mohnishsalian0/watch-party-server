function joinRoom(socket, rooms, users) {
  const { userId, userName, userAvatar, room } = socket.user;

  if (!rooms.hasOwnProperty(room)) {
    console.log(`Creating room ${room}...`);
    rooms[room] = { users: {} };
    rooms[room].host = {
      hostId: userId,
      hostName: userName,
      hostAvatar: userAvatar,
    };
    console.log(`${userName} is the host`);
  }

  rooms[room].users[userId] = {
    userName,
    userAvatar,
    isHost: true,
  };

  users[userId] = {
    userName,
    userAvatar,
    room,
    socketId: socket.id,
  };

  socket.join(room);

  socket.emit("room:users", {
    users: rooms[room].users,
  });

  socket.to(room).emit("user:joined", {
    userId,
    userName,
    userAvatar,
  });
}

function leaveRoom(socket, rooms, users) {
  const { userId, userName, userAvatar, room } = socket.user;

  delete rooms[room].users[userId];

  delete users[userId];

  const userIds = Object.keys(rooms[room].users);
  if (userIds.length > 0) {
    // If the user leaving is a host, pick a new host randomly
    if (userId === rooms[room].host.hostId) {
      const newHost = rooms[room].users[userIds[0]];
      rooms[room].host = {
        hostId: userIds[0],
        hostName: newHost.userName,
        hostAvatar: newHost.userAvatar,
      };
      newHost.isHost = true;
      console.log(`${newHost.userName} is now the host of room: ${room}`);
    }
  } else {
    console.log(`Room "${room}" is empty. Closing room...`);
    delete rooms[room];
  }

  socket.to(room).emit("user:left", {
    userId,
    userName,
    userAvatar,
  });

  socket.leave(room);
}

module.exports = {
  joinRoom,
  leaveRoom,
};
