const { MongoClient } = require("mongodb")


class Controller {
    constructor()
    {
        this.client = MongoClient;
        this.conStr = "mongodb://localhost:27017/";
    }

    connectTODb() {
        return new Promise((resolve, reject)=>{
            this.client.connect(this.conStr,function(err,DB){

            if(err)
            {
                reject(err)
            }

            resolve(DB);
        })})
    }

    
    async getProducts() {
        const DB = await this.connectTODb();
        const db = DB.db("Day5Test");

        return new Promise((resovle,reject)=> {
            db.collection("product").find({}).toArray((err,res)=>
            {
                DB.close();
                resovle(res)
            })
        })
    }


    insertProduct(obj) { 
        return new Promise((resolve,reject)=> {
            this.connectTODb().then((DB)=> {
                const db=DB.db("Day5Test");
                db.collection("product").insertOne(obj,function(err,res)
                {
                    if(err) reject(err);
                    resolve(res)
                    DB.close()
                })
            })
        })
    }

    updateProduct(product) { 
        const {n} = product
        const updated = {
            ...(product.name && {name: product.name } ),
            ...(product.quantity && {quantity: product.quantity } ),
            ...(product.price && {quantity: product.price } ),
        }

        return new Promise((resolve,reject)=> {
            this.connectTODb().then((DB)=> {
                const db=DB.db("Day5Test");
                db.collection("product").updateOne({name: n}, {$set: updated}, function(err,res) {
                    resolve(true)
                    DB.close()
                })
            })
        })
    }

    deleteProductByName(name) { 
        return new Promise((resolve,reject)=> {
            this.connectTODb().then((DB)=> {
                const db=DB.db("Day5Test");
                db.collection("product").deleteOne({name: name},function(err,res)
                {
                    if(err) reject(err);
                    if (res.deletedCount === 1) {
                        resolve("<h1> Successfully deleted one document. </h1>");
                    } else {
                        resolve("<h1> No documents matched the query. Deleted 0 documents. </h1>");
                    }
                    DB.close()
                })
            })
        })
    }

    getProductByName(name) {   
        return new Promise((reslove,reject)=> {
        this.connectTODb().then((DB)=>
        {
            var dbo = DB.db("Day5Test");
            dbo.collection("product").findOne({"name": name},function(err,res)
            {
                DB.close()
                reslove(res)
                    
            })
        })
    })
}
}


module.exports = Controller;
