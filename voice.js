function sendOffer(socket, payload, users) {
  const { userId } = socket.user;
  const { offer, receiverId } = payload;
  const { socketId: receiverSocketId } = users[receiverId];
  // FIXME:
  console.log("sjadlfjdsfjaslkd", users[receiverId]);
  socket.to(receiverSocketId).emit("call:offer", { offer, senderId: userId });
}

function sendAnswer(socket, payload, users) {
  const { userId } = socket.user;
  const { answer, receiverId } = payload;
  const { socketId: receiverSocketId } = users[receiverId];
  socket.to(receiverSocketId).emit("call:answer", { answer, senderId: userId });
}

function sendCandidate(socket, payload, users) {
  const { userId } = socket.user;
  const { candidate, receiverId } = payload;
  const { socketId: receiverSocketId } = users[receiverId];
  socket
    .to(receiverSocketId)
    .emit("call:candidate", { candidate, senderId: userId });
}

module.exports = { sendOffer, sendAnswer, sendCandidate };
