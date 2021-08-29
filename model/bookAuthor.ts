import sequelize  from '../db/database';
import Book  from './book';
import Author from './author';

/* @ts-ignore */
let BookAuthor = sequelize.define('BookAuthor');

Book.belongsToMany(Author,{ through: 'BookAuthor'});
Author.belongsToMany(Book, {through: 'BookAuthor'});

export default BookAuthor;