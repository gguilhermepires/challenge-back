import BookDomain from '../domain/book';

const getAll = async (req: any, res: any) =>  {
  try{
    const bookdomain = new BookDomain();
    const response = await bookdomain.getAllBooks(req.query)
    res.json(response);
  }catch(erro){
    let { code, message} = erro;
    if(code)
      res.status(code).json({message});
    else
      res.status(500).json({message});
  }
};

const get = async (req: any, res: any) =>  {
  try{
    const bookdomain = new BookDomain();
    const response = await bookdomain.getOneBook(req.params)
    res.json(response);
  }catch(erro){
    let { code, message} = erro;
    if(code)
        res.status(code).json({message});
    else
        res.status(500).json({message});
  }
};

const add = async (req: any, res: any) =>  {
  try{
    const bookdomain = new BookDomain();
    const response = await bookdomain.registerOneBook(req.body);
    res.status(201).json(response);
  }catch(erro){
    let { code, message} = erro;
    if(code)
        res.status(code).json({message});
    else
        res.status(500).json({message});
  }
};

const remove = async (req: any, res: any) =>  {
  try{
    const bookdomain = new BookDomain();
    const response = await bookdomain.removeOneBook(req.params);
    res.json(response);
  }catch(erro){
    let { code, message} = erro;
    if(code)
        res.status(code).json({message});
    else
        res.status(500).json({message});
  }
};

const update = async (req:any , res: any) =>  {
  try{
    const bookdomain = new BookDomain();
    const response = await bookdomain.updateOneBook(req.body, req.params);
    res.json(response)
  }catch(erro){
    let { code, message} = erro;
    if(code)
      res.status(code).json({message});
    else
      res.status(500).json({message});
  }
};

export default {
  getAll,
  add,
  remove,
  update,
  get
}