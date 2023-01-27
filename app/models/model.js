import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize("trulala-app", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

export { sequelize, DataTypes };