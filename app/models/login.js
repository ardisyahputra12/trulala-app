const { sequelize, DataTypes } = require("./model.js");

const Login = sequelize.define("login", {
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
});

module.exports = Login;