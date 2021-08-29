import { DataTypes } from 'sequelize';
import sequelize from '../db/database';

let Author = sequelize.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING
});
export default Author;