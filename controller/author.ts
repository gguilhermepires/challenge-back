import AuthorDomain from '../domain/author';

const getAll = async (req: any, res: any) =>  {
  try{
    const authorDomain = new AuthorDomain();
    const response = await authorDomain.getAllAuthors(req.query)
    res.json(response);
  }catch(erro){
    let { code, message} = erro;
    if(code)
      res.status(code).json({message});
    else
      res.status(500).json({message});
  }
};

export default {
  getAll
}

