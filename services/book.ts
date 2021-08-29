import BookModel from '../model/book';
import AuthorModel from '../model/author';
import DatabaseHelper  from '../infrastructure/databaseHelper';

class BookService {
  
    static async commitTransaction(transaction: any){
        return DatabaseHelper.commitTransaction(transaction);
    }

    static async createTransaction(){
        return await DatabaseHelper.createTransaction();
    }

    static async rollbackTransaction(transaction: any){
        return await DatabaseHelper.roolbackTransaction(transaction);
    }

    static async createOneBook(book: any, transaction=''){
        if(transaction)
            return await DatabaseHelper.createWithTransaction(BookModel, book, transaction);
        return await DatabaseHelper.create(BookModel, book);
    }
    
    static async addAuthorOnBook(book: any, authorId: any) {
        let author = await AuthorModel.findByPk(authorId);
        if(author == null)
            throw { code: 400, message: "Could not find author" }; 
        book.addAuthor(author);
        return author;
    }

    static async getOneBook(bookId: number){
        return await DatabaseHelper.getByPkWithInclude(BookModel, bookId, {include: AuthorModel});
    }

    static async getAllBooks(whereObj: any, includeAuthor=false){
        if(includeAuthor)
            return await DatabaseHelper.getAll(BookModel, whereObj,'', AuthorModel);
        return await DatabaseHelper.getAll(BookModel, null, null,null);
    }

    static async destroyOneBook (book: any){
        DatabaseHelper.destroy(book);
    }

    static removeAuthorFromBook (book: any, author: any){
        book.removeAuthor(author)
    }

    static addAuthorFromBook (book: any, author: any){
        book.addAuthor(author);
    }
}

export default BookService;