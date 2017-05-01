const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Message = require('../models/message');
const Chatroom = require('../models/chatroom');

// Send message
router.post('/send-message', (req, res, next) => {
    let newMsg = new Message({
        name: req.body.name,
        message: req.body.message
    });

    Message.addMessage(newMsg, (err, msg) => {
        if(err){
            res.json({success: false, msg: 'Failed to save message'});
        } else{
            res.json({success: true, msg: 'Message saved'});
            router.notifyclients();
        }
    })
});

router.post('/create-chatroom', (req, res, next) => {
    let newRoom = new Chatroom({
        name: req.body.name,
        owner: req.body.owner
    });

    Chatroom.addChatroom(newRoom, (err, msg) => {
        if(err){
            res.json({success: false, msg: 'Failed to create room'});
        } else{
            res.json({success: true, msg: 'Room has been created'});
            router.notifyClientsAboutRooms();
        }
    })
});

router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyclients = function (client) {
    Message.find({}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh messages', messages);
        })
    });
};
router.notifyClientsAboutRooms = function (client) {
    Chatroom.find({}).exec(function (err, rooms) {
        console.log(rooms);
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh chatrooms', rooms);
        })
    });
};

module.exports = router;