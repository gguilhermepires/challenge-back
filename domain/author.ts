import AuthorService  from '../services/author';
import TypeConversorService from '../services/typeConversor';

class AuthorDomain {

    filter_pagination(authors: any, limit: number, page: number){
        let length = authors.length;
        const totalPage = length > 0 ? Math.ceil(length / limit): 0;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        return  { authors: authors.splice(startIndex, endIndex), limit, page, totalPage }
    }

    async getAllAuthors (payload: any){
        let { name, limit, page } = payload; 
        let whereObj  = {}
        if (name != undefined)
            whereObj = {name:name};
        
        if (limit == undefined)
            limit = 10;
        else
            limit = TypeConversorService.convertStringToInt(limit);
        
        if (page == undefined)
            page = 1;
        else
            page = TypeConversorService.convertStringToInt(page);

        const authors = await AuthorService.getAllAuthors(whereObj);
        return this.filter_pagination(authors, limit, page);          
    }
}

export default AuthorDomain;