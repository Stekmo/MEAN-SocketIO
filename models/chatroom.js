const mongoose = require('mongoose');

// Message Schema
const chatroomSchema = mongoose.Schema({
    name: {
        type: String
    },
    owner: {
        type: String
    }
});

const Chatroom = module.exports = mongoose.model('Chatroom', chatroomSchema);

module.exports.addChatroom = function(newRoom, callback){
    newRoom.save(callback);
};