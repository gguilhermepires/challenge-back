import { Sequelize } from 'sequelize';
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USER, process.env.DB_PASS, {
    logging: process.env.DB_LOGGING ? process.env.DB_LOGGING == 'true' : false,
    /* @ts-ignore */
    dialect: process.env.DB_DIALECT ? process.env.DB_DIALECT : 'postgres',
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    port: process.env.DB_DATABASE_PORT ? parseInt(process.env.DB_DATABASE_PORT) : 3306
});

export default sequelize;
