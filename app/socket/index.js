const h = require('../helpers');

module.exports = (io, app) => {
  // Each chat room needs certain data
    // room id, list of users, room name
      // users need to have a lot of data
  let allrooms = app.locals.chatrooms;

  io.of('/roomslist').on('connection', (socket) => {
    socket.on('getChatRooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
    });
    socket.on('newRoom', (newRoom) => {
      if (!h.doesNewRoomExist(allrooms, newRoom)) {
        // create new room
        allrooms.push({
          room: newRoom,
          roomID: h.generateId(),
          users: [],
        })

        // emit an event to let folks know about this new room or w/e
        socket.emit('chatRoomsList', JSON.stringify(allrooms)); // emits to creator of room
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms))// emits to all users
      } else {
        // dont create new room
      }
    })
  });
}