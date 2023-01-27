import { sequelize, DataTypes } from "./model.js";

const Backlog = sequelize.define("backlog", {
    card: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

export default Backlog;