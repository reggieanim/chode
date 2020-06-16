const socketIO = require('socket.io');

module.exports = function(server) {
    var io = socketIO(server);
    io.on('connection', function(socket) {
        socket.on('joinRoom',  function(data) {
            
            socket.room = data.room;
            socket.name = data.username;
            socket.join(data.room)
            io.to(socket.room).emit('chatMessage', data)
        })

        socket.on('chatMessage', function(data) {
            console.log(data)
            io.to(socket.room).emit('chatMessage', data)
        })

        socket.on('disconnect', function() {
            socket.leave(socket.room)
            io.to(socket.room).emit('chatMessage',{username:`${socket.name} left`, message:""})
        })
    })
}