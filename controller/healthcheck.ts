
const check = async (req: any, res: any) =>  {
    res.json({message: `ok. date: ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`})
};

export { check }