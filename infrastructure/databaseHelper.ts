import sequelize from '../db/database';

class DatabaseHelper {

    static createTransaction(){
       return sequelize.transaction();
    }
    
    static roolbackTransaction(transaction: any){
        return transaction.rollback();
    }
    static commitTransaction(transaction: any){
        return transaction.commit();
    }

    static createWithTransaction(modelDatabase: any, data: any, transaction: any){
        return modelDatabase.create(data, {transaction});
    }

    static create(modelDatabase: any, data: any){
        return modelDatabase.create(data);
    }

    static getAll(modelDatabase: any, _where:any, _order:any, include:any){
        if(_where){
            if(_order)
                return modelDatabase.findAll({include: include, where:_where, order:_order });

            return modelDatabase.findAll({ include:include,  where:_where });
        }
        
        if(_order)
            return modelDatabase.findAll({include: include ,  order:_order });
        return modelDatabase.findAll({ include: include });
    }

    static getByPk(modelDatabase: any, pk:number){
        return modelDatabase.findByPk(pk);
    }
    
    static getByPkWithInclude(modelDatabase: any, pk: number, include: any){
        return modelDatabase.findByPk(pk, include);
    }

    static destroy(objectDataBase: any){
        objectDataBase.destroy();
    }
    
    static update(objectDataBase: any){
        objectDataBase.save();
    }
    static bulkCreate(modelDatabase: any, data: any){
        modelDatabase.bulkCreate(data)
    }
}

export default DatabaseHelper;