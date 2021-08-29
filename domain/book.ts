import BookService from '../services/book';
import AuthorService from '../services/author';
import TypeConversorService from '../services/typeConversor';

class BookDomain {
   
    async registerOneBook (payload: { name: any; edition: any; publicationYear: any; authors: any; }) {
        try{
            const bookPayload = {
                name: payload.name,
                edition: payload.edition,   
                publicationYear:payload.publicationYear
            }
            const authorsId = payload.authors;
            
            if(authorsId == null || authorsId == undefined)
                throw Error('could not find a Author')
            
            let book = await BookService.createOneBook(bookPayload);
            
            for(let i = 0; i< authorsId.length; i++)
                await BookService.addAuthorOnBook(book,authorsId[i])
                
            return {... book.dataValues, authors:authorsId};
        }catch(error){
            throw error
        }
    }

    async getOneBook (payload: { id: any; }){
        let { id } = payload;
        id = TypeConversorService.convertStringToInt(id);
        return await BookService.getOneBook(id)
    }

    filter_pagination(books: any[], limit: number, page: number){
        let length = books.length;
        const totalPage = length > 0 ? Math.ceil(length / limit): 0;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        return  {books:books.splice(startIndex, endIndex), limit, page, totalPage}
    }

    async getAllBooks (payload: { name: any; publicationYear: any; edition: any; authorsId: any; limit: any; page: any; }){
        let { name, publicationYear, edition, authorsId, limit, page } = payload; 
        let books = []
        let whereObj = {}
        let author, authorId: any, book;
        let output = [];

        if (name != undefined)
            whereObj = {name:name};
        if (publicationYear != undefined)
            /* @ts-ignore */
            whereObj.publicationYear = publicationYear;
        if (edition != undefined)
            /* @ts-ignore */
            whereObj.edition = edition;
        if (authorsId != undefined)
            authorsId = JSON.parse(authorsId)
        
        if (limit == undefined)
            limit = 10;
        else
            limit = TypeConversorService.convertStringToInt(limit);
        
        if (page == undefined)
            page = 1 
        else
            page = TypeConversorService.convertStringToInt(page);

        books = await BookService.getAllBooks(whereObj, true);          

        if (authorsId){
            for (let i = 0; i < books.length; i++) {
                book = books[i];
                for (let j = 0; j < authorsId.length; j++) {
                    authorId = authorsId[j];
                    author = await book.Authors.find((author: { id: any; }) => author.id == authorId);
                    if(author == null)
                        continue;
                    output.push(book)
                    break;
                }
            }
        }else{
            output = books;
        }
        return this.filter_pagination(output, limit, page);
    }
    
    async removeOneBook(payload: any){
        let { id } = payload;
        id = TypeConversorService.convertStringToInt(id);
        let book = await BookService.getOneBook(id)
        if(book == null)
          throw Error(`Could not find bookId: ${id}`)
        await BookService.destroyOneBook(book)
        return {message: `BookId: ${id} Removed with success`};
    }
    
    async updateOneBook(payloadBody: any, payloadParam: any){
        
        const bookPayload = {
            name: payloadBody.name,
            edition: payloadBody.edition,   
            publicationYear: payloadBody.publicationYear
        }
        const authorsId = payloadBody.authors;
        let { id } = payloadParam;
        let author: any;
        id = TypeConversorService.convertStringToInt(id);
        
        let book = await BookService.getOneBook(id)
        if(book == null)
            throw Error(`Could not find bookId: ${id}`)
        
        book.Authors.forEach(async (author: any) => {
            BookService.removeAuthorFromBook(book, author)
        });    
    
        authorsId.forEach(async (authorId: number) => {
            author = await AuthorService.getOneAuthor(authorId)
            BookService.addAuthorFromBook(book, author)
        });
    
        book.name = payloadBody.name;
        book.edition = payloadBody.edition;
        book.publicationYear = payloadBody.publicationYear;
        book.save();
        return { message: 'update with success' };
    }
}

export default BookDomain;