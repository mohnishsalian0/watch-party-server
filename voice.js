function saveOffer(socket, payload, rooms) {
  const { room } = socket.user;
  rooms[room].offer = payload.offer;
}

function saveAndSendAnswer(socket, payload, rooms) {
  const { room } = socket.user;
  rooms[room].answer = payload.answer;
  socket.to(room).emit("call:answer", payload);
}

function sendNewCandidate(socket, payload, rooms) {
  const { room } = socket.user;
  rooms[room].candidates.push(payload);
  socket.to(room).emit("call:newCandidate", payload);
}

module.exports = { saveOffer, saveAndSendAnswer, sendNewCandidate };
