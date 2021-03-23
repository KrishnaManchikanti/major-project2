module.exports.chatSockets = function(socketServer)
{
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket)
    {
        console.log('New connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('Socket Disconnected');
        });

        socket.on('join_room',(data)=>{
            console.log('join req rec',data);
            socket.join(data.chatroom);
            
            io.in(data.chatroom).emit('user_joined',data);
        })

        socket.on('send_message',(data)=>{
            io.in(data.chatroom).emit('receive_message',data);
        })
    });
} 