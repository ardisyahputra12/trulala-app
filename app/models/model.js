const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("trulala-app", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = { sequelize, DataTypes };