const { sequelize, DataTypes } = require("./model.js");

const Chat = sequelize.define("chat", {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_socket: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_message: DataTypes.STRING,
    createdAt: DataTypes.STRING,
});

module.exports = Chat;