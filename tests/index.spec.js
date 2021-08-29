const request = require('supertest')
const app = require('../server');

describe('Test API', ()=>{

    it('test healthcheck', async ()=> {
        const  res = await request(app).get('/healthcheck')
        expect(res.status).toBe(200)
    })

    it('create book', async ()=> {
        const  res = await request(app).post('/books').send({
                name:"teste11",
                edition:"c",
                publicationYear:1992,
                authors:[2]
        });
        expect(res.status).toBe(201);
    })

    it('get all book', async ()=> {
        const  res = await request(app).get('/books');
        expect(res.status).toBe(200);
    })
    
    it('get all authors', async ()=> {
        const  res = await request(app).get('/authors');
        expect(res.status).toBe(200);
    })

    it('update a book', async ()=> {
        let  res = await request(app).post('/books').send({
                name:"teste11",
                edition:"c",
                publicationYear:1992,
                authors:[2]
        });
        
        if(res.status != 201)
            throw new Error("Could not create book for test");
    
        const bookId = res.body.id;
        res = await request(app).put('/books/${bookId}').send({
            name:"test new name",
            edition:"d",
            publicationYear:2012,
            authors:[3]
        });
    
        expect(res.status).toBe(200);
    })

    it('remove a book', async ()=> {
        let  res = await request(app).post('/books').send({
                name:"teste11",
                edition:"c",
                publicationYear:1992,
                authors:[2]
        });
        
        if(res.status != 201)
            throw new Error("Could not create book for test");
    
        const bookId = res.body.id;
        res = await request(app).delete('/books/${bookId}');
        expect(res.status).toBe(200);
    })

})