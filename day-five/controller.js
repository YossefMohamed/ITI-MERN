const { MongoClient } = require('mongodb')

class Controller {
    constructor() {
        this.mongoClient = MongoClient;
        this.connectionStr = "mongodb://localhost:27017/";
        this.database = "Day5Test";
        this.collection = "product"
    }

    async connectToDB() {
        return await this.mongoClient.connect(this.connectionStr)
    }

    async createProduct(product) {
        const connection = await this.connectToDB()
        const db = await connection.db(this.database)
        const createdProduct = await db.collection(this.collection).insertOne(product)
        return `A document was inserted with the _id: ${createdProduct.insertedId}`
    }

    updateProduct(product) {
        const {n} = product
        const data = {
            ...(product.name && {name: product.name } ),
            ...(product.quantity && {quantity: product.quantity } ),
            ...(product.price && {quantity: product.price } ),
        }

        return new Promise((resolve, reject) => {
            this.connectToDB().then(connection => {
                const db = connection.db(this.database)
                db.collection(this.collection).updateOne({"name": n}, data, function (err, resp) {
                    connection.close()
                    resolve(resp)
                })
            })
        })
    }

    deleteProductByName(name) {
        return new Promise((resolve, reject) => {
            this.connectToDB().then(connection => {
                const db = connection.db(this.database)
                // or using deleteOne
                db.collection(this.collection).findOneAndDelete({"name": name}, function (err, result) {
                    connection.close()
                    if (result.ok == 1) {
                        resolve("<h1> Successfully deleted one document. </h1>");
                    } else {
                        resolve("<h1> No documents matched the query. Deleted 0 documents. </h1>");
                    }
                })
            })
        })
    }

    getProductByName(name) {
        return new Promise((resolve, reject) => {
            this.connectToDB().then(connection => {
                const db = connection.db(this.database)
                db.collection(this.collection).findOne({"name": name}, function (err, product) {
                    connection.close()
                    resolve(product)
                })
            })
        })
    }

    getProducts() {
        return new Promise((resolve, reject) => {
            this.connectToDB().then(connection => {
                const db = connection.db(this.database)
                db.collection(this.collection).find({}).toArray((err, products) => {
                    connection.close()
                    resolve(products)
                })
            })
        })
    }
}

module.exports = Controller;
