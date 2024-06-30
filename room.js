function joinRoom(socket, rooms, users) {
  const { userId, userName, userAvatar, room } = socket.user;
  let isHost = false;

  if (!rooms.hasOwnProperty(room)) {
    console.log(`Creating room ${room}...`);
    rooms[room] = { users: {}, tab: {}, candidates: [] };
    rooms[room].host = {
      id: userId,
      name: userName,
      avatar: userAvatar,
    };
    isHost = true;
    console.log(`${userName} is the host`);
  }

  rooms[room].users[userId] = {
    userId,
    userName,
    userAvatar,
    isHost,
  };
  users[userId] = {
    userId,
    userName,
    userAvatar,
    room,
    socketId: socket.id,
  };

  socket.join(room);

  if (!isHost) {
    socket.emit("room:existingUsers", {
      users: rooms[room].users,
    });
    socket.emit("tab:redirect", {
      userId: rooms[room].host.id,
      userName: rooms[room].host.name,
      userAvatar: rooms[room].host.avatar,
      url: rooms[room].tab.url,
    });
  }

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
    if (userId === rooms[room].host.id) {
      const newHost = rooms[room].users[userIds[0]];
      rooms[room].host = {
        id: userIds[0],
        name: newHost.userName,
        avatar: newHost.userAvatar,
      };
      newHost.isHost = true;
      console.log(`${newHost.userName} is now the host of room: ${room}`);
      socket.to(room).emit("room:hostChange", {
        hostId: userIds[0],
        hostName: newHost.userName,
        hostAvatar: newHost.userAvatar,
      });
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
