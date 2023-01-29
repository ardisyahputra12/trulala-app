const Chat = require("../models/chat.js");
const { sequelize } = require("../models/model.js");

function getAllData() {
    const data = Chat.findAll({ order: [['id', 'ASC']] })
    return data;
};

function getNameData() {
    const data = Chat.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('user_name')), 'user_name']],
    })
    return data;
}

module.exports = {
    getAllData,
    getNameData,
};