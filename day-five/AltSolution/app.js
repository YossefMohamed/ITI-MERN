const express = require('express');
const Controller = require('./controller');

const app = express();
const control = new Controller();
const port = 9003;

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
})


// insert product via post req body
app.post('/products',(req, res) => {
    const {name, price, quantity} = req.body
    if(name && price && quantity) {
        control.insertProduct({ name, price, quantity }).then((data) => {
            res.redirect('/products')
        })
    } else {
        res.send('<h1> You must provide name, price and quantity </h1>')
    }
})


// update product via post req body
app.post('/update', (req, res) => {
    const {n, name, price, quantity} = req.body
    if(n) {
        control.updateProduct(req.body).then((data) => {
            res.redirect('/products')
        })
    } else {
        res.send('<h1> Wrong syntax </h1>')
    }
})

// delete product by name
app.post('/delete', (req, res) => {
    if(req.body.name) {
        control.deleteProductByName(req.body.name).then((data) => {
            res.send(data)
        })
    } else {
        res.send('<h1> You must provide name </h1>')
    }
})

// retrieve product by name
app.get('/products/:name', (req, res) => {
    const product = control.getProductByName(req.params.name).then((data) => {
        if(data) res.send(data)
        else res.send('<h1>404 - Not Found</h1>')
    })
})

// retrieve product by name
app.get('/products/item', (req, res) => {
    const product = control.getProductByName(req.query.name).then((data) => {
        if(data) res.send(data)
        else res.send('<h1>404 - Not Found</h1>')
    })
})

// retrieve all products
app.get('/products', (req, res) => {
    control.getProducts().then((data) => {
        res.send(data)
    })
    
})

// for unhandled endpoints
app.use((req, res) => {
    res.status(404)
    res.send('<h1>404 - Not Found</h1>')
})

// for server errors
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.send('<h1>500 - Server Error</h1>')
})


app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))