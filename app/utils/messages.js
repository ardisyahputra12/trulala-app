const moment = require('moment');
const Chat = require("../models/chat.js");

function formatMessage(id, username, text) {
    const data = Chat.create({
        id_socket: id,
        user_name: username.trim(),
        user_message: text,
        createdAt: moment().format('DD/MM/YYYY h:mm a')
    })
    return data;
};

module.exports = formatMessage;