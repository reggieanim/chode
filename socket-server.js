const socketIO = require('socket.io');
var ot = require('ot');
const Session  = require("./models/session")
var roomList = {};

module.exports = function(server) {
    var str = 'Hello there'
    var io = socketIO(server);
    io.on('connection', function(socket) {
        socket.on('joinRoom',  function(data) {
            if (!roomList[data.room]) {
              
                var socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb){
                    var self = this;
                    Session.findByIdAndUpdate(data.room, {content: self.document}, function(err){
                        if (err) return cb(false);
                        cb(true)
                    })
                });
                roomList[data.room] = socketIOServer;
            }
            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);
            console.log(JSON.stringify(roomList))

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