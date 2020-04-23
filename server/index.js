const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const config=require('./config');
const router = require('./data-route/dataRoute');
var Pusher = require('pusher');
const chatUserModel = require('./data-model/dataModelUpdated')
const { addUser, removeUser, getUser, getUsersInRoom, getReceiverSocketId } = require('./users/user');
const messageModel = require('./data-model/messageModel');
const moment = require('moment');
const path=require('path');

mongoose.connect(config.connection_string , {useNewUrlParser: true, useUnifiedTopology: true}).then((client)=>{


    })

var pusher = new Pusher({
  appId: '983115',
  key: '764535e7de3c06e6376d',
  secret: '8133c694c1536de3090f',
  cluster: 'eu',
  encrypted: true
});

const app = express();
app.use(express.json({ limit: '10MB' }));
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());

const appPath=path.join(__dirname, '..', 'build');
app.use(express.static(appPath));

/*app.get('*', function(req, res){
    res.sendFile(path.resolve(appPath, 'index.html'));
});*/

const changeStream= chatUserModel.watch() 

changeStream.on('change', (change) => {

console.log(change)
if(change.updateDescription){
let status = Object.keys(change.updateDescription.updatedFields)[0]
console.log('change')
console.log(status)
if(status !== 'status')
pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});
}
  });

app.use('/api/v1/application',router);

//Making connection with the user frontend ----------------------------------
io.on('connect', (socket) => {
  
  //passing unique name of frd and unique roomId( This can be user ID from mongoDB)
  socket.on('join', ({ name, userID }, callback) => {
    console.log(name)
    console.log(userID)
    const { error, user } = addUser({ id: socket.id, name, userID});

    if(error) return callback(error);

    socket.join(user.userID);
    console.log('add user index.js')
    console.log(user)
    //socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    //socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.emit('online', {userID: user['userID'], name: user['name']});

    chatUserModel.findOneAndUpdate(
      { _id: user['userID']},
      { status: "online"}
    ).then((data)=>{
      console.log('status updated to online')
    })
    //callback();
  });

  socket.on('sendMessage', (messageObj, callback) => {
    let user = getUser(socket.id);
    console.log('get user')
    console.log(user)
    if(user){
    let receiverID= messageObj['receiverID']
    let receiverSocketID = getReceiverSocketId(receiverID) 
    if(receiverSocketID){
    socket.to(receiverSocketID.id).emit('message', { user: user.name, text: messageObj['message'] });

    messageModel.findOneAndUpdate({senderUserID: `${user.userID}`,
                                    receiverUserID: `${receiverID}`}, 
                                   {$push:{ message: { user: user.name, text: messageObj['message'],
                                                       date: Date.now }}}).then((data)=>{
                                                         console.log(`updated to ${user.userID}`)
                                                       }).catch((err)=>{
                                                         console.log(err)
                                                       })

    messageModel.findOneAndUpdate({senderUserID: `${receiverID}`,
                                    receiverUserID: `${user.userID}`}, 
                                   {$push:{ message: { user: user.name, text: messageObj['message'] ,
                                                       date: Date.now }}}).then((data)=>{
                                                         console.log(`updated to ${receiverID}`)
                                                       }).catch((err)=>{
                                                         console.log(err)
                                                       })


    //messageModelObj.save()
    callback();
  }
  else{
    socket.emit('offline', {text: 'User is currently offline and this message is archived in MongoDB'});
    messageModel.findOneAndUpdate({senderUserID: `${user.userID}`,
                                    receiverUserID: `${receiverID}`}, 
                                   {$push:{ message: { user: user.name, text: messageObj['message'],
                                                       date: Date.now }}}).then((data)=>{
                                                         console.log(`updated to ${user.userID}`)
                                                       }).catch((err)=>{
                                                         console.log(err)
                                                       })

    messageModel.findOneAndUpdate({senderUserID: `${receiverID}`,
                                    receiverUserID: `${user.userID}`}, 
                                   {$push:{ message: { user: user.name, text: messageObj['message'] ,
                                                       date: Date.now }}}).then((data)=>{
                                                         console.log(`updated to ${receiverID}`)
                                                       }).catch((err)=>{
                                                         console.log(err)
                                                       })
  }
}
else{
socket.emit('sessionOut', {text: 'Please login again as your session is over'});
}
  });

   socket.on("callUser", (data) => {
    let user = getUser(socket.id);
    console.log('user how is calling')
    console.log(user)
    if(user){
    let receiverID= data['userToCall']
    let receiverSocketID = getReceiverSocketId(receiverID) 
    if(receiverSocketID){
        io.to(receiverSocketID.id).emit('hey', {signal: data.signalData, from: data.from});
      }

      else{
        socket.emit('offlineCall', {text: 'User is currently offline'});
      }
    }
    else{
      socket.emit('sessionOut', {text: 'Please login again as your session is over'});
    }
    })

    socket.on("acceptCall", (data) => {
    let user = getUser(socket.id);
    console.log('user getting call')
    console.log(user)
    if(user){
    let receiverID= data['receiverID']
    let receiverSocketID = getReceiverSocketId(receiverID) 
    if(receiverSocketID){
        io.to(receiverSocketID.id).emit('callAccepted', data.signal);
      }
       else{
        socket.emit('offlineCall', {text: 'User is currently offline'});
      }
    }
      else{
          socket.emit('sessionOut', {text: 'Please login again as your session is over'});      
    }
    })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log('removeUser')
    console.log(user)
    if(user) {
      io.emit('userIsOffile', {userID: user['userID'], name: user['name'], time: moment().format('LLLL')})
      //io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        chatUserModel.findOneAndUpdate(
      { _id: user['userID']},
      { status: String(moment().format('LLLL'))}
    ).then((data)=>{
      console.log('status updated to online')
    })

    //callback()
    }
  })
});



server.listen(process.env.PORT || 3001, () => console.log(`Server has started.`));