import ModelAuthor from '../model/author';
import DatabaseHelperAuthor from '../infrastructure/databaseHelper';

class AuthorService {

    static async getOneAuthor(authorId: number){
        return await DatabaseHelperAuthor.getByPkWithInclude(ModelAuthor, authorId, null);
    }

    static async getAllAuthors(whereObj={}){
        return await DatabaseHelperAuthor.getAll(ModelAuthor, whereObj, null, null);
    }
    static async createAuthors(authors: any){
        return await DatabaseHelperAuthor.bulkCreate(ModelAuthor, authors);
    }
    
}
export default AuthorService;