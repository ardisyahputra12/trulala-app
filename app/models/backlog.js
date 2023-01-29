const { sequelize, DataTypes } = require("./model.js");

const Backlog = sequelize.define("backlog", {
    card: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = Backlog;