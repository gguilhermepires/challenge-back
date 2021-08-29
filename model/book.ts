import { DataTypes } from 'sequelize';
import sequelize  from '../db/database';

let Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    edition: DataTypes.STRING,
    publicationYear: DataTypes.INTEGER,
});

export default Book;