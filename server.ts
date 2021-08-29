const path = require('path');
const express = require('express');
import sequelize from './db/database';
const cors = require('cors');
const app = express();
require('dotenv').config();
import book from './model/book';
import author from './model/author';
import BookAuthor from './model/bookauthor';


const force = process.env.DB_FORCE_SYNC == 'true';

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const server = require('http').createServer(app);
app.use(express.static(path.join(__dirname, 'public')));

/* @ts-ignore */
global.__basedir = __dirname ;

app.use(cors({ origin: 'http://localhost'}));


/********************* rotas *************************** */

const authorRoute = require('./routes/author');
const bookRoute = require('./routes/book');
const healthcheckRoute = require('./routes/healthcheck');

app.use(bookRoute);
app.use(authorRoute);
app.use(healthcheckRoute);

/************************************************ */

    sequelize.sync({ force }).then( (_: any) => {

        author.sync({force});
        book.sync({force});
        BookAuthor.sync({force});
        console.log("Database update");
    }).catch((e: { toString: () => any; }) => {
        console.log("Error update database:", e.toString());
    });

module.exports = app;