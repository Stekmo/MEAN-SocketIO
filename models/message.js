const mongoose = require('mongoose');

// Message Schema
const msgSchema = mongoose.Schema({
    name: {
        type: String
    },
    message: {
        type: String
    },
    chatroom: {
        type: String
    },
    createdOn: {
        type: Date, default: Date.now
    }
});

const Message = module.exports = mongoose.model('Message', msgSchema);

module.exports.addMessage = function(newMsg, callback){
    newMsg.save(callback);
};