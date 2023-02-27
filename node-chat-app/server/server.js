const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/messages');
const {isRealString} = require('./utils/validation');
const {Users}= require('./utils/users');

//const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

//app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New User connected');

  socket.on('checkUser',(param)=>{
    console.log(param.name,param.room);
    console.log('checking for authentication');
    socket.emit('redirect');
  });

  socket.on('join',(params)=>{
    if(!isRealString(params.name)||!isRealString(params.room)){
      console.log('Invalid Username/ room');
      socket.emit('invalidAuthorization');
    }else {
      console.log('User ', params.name, " has joined on room ", params.room);
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
      //console.log(users);
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      console.log('Emitted usernames to new user');

      socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
      console.log('Emitted welcome to new user')

      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
      console.log('Notified everyone about new User');

    }
  });
  socket.on('createMessage',(message)=>{
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }

  });
  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    console.log('User disconnected');
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
  });

});
server.listen(port, () => {
  console.log(`Go to http://localhost:${port}`);
});
