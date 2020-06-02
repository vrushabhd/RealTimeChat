///Node server which will handle socket io connections
require('dotenv').config()
const io =require('socket.io')(process.env.PORT || 8000)
const users={};
io.on('connection',socket =>{
    //If any new users joins,let the other users connected to the server know!

socket.on('new-user-joined',name =>{   //listening to event
    users[socket.id] = name;    //setting the id's
    socket.broadcast.emit('user-joined',name);




});
//If someone sends a message broadcastit to other people.
  socket.on('send',message =>{


   socket.broadcast.emit('receive',{message:message ,name:users[socket.id]})



  });
//If someone leaves the caht let others know
  socket.on('disconnect',message =>{


    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
 
 
 
   });
})
