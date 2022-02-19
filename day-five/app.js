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
app.post('/insert', (req, res) => {
    const {name, price, quantity} = req.body
    if(name && price && quantity) {
        const product = control.createProduct(req.body).then(product => {
            res.redirect('/all')
        })
    } else {
        res.send('<h1> You must provide name, price and quantity </h1>')
    }
})

// update product via post req body
app.post('/update', (req, res) => {
    const {n, name, price, quantity} = req.body
    if(name && price && quantity && n) {
        control.updateProduct(req.body).then(function(p) {
            res.redirect('/all')
        })
    } else {
        res.send('<h1> Wrong syntax </h1>')
    }
})

// delete product by name
app.post('/delete', (req, res) => {
    if(req.body.name) {
        const product = control.deleteProductByName(req.params.name).then(result => {
            res.send(result)
        })
        } else {
            res.send('<h1> You must provide name </h1>')
        }
})

// retrieve product by name
app.get('/products/', (req, res) => {
    if(req.query.name) {
    const product = control.getProductByName(req.query.name).then(product => {
        res.send(product)
    })
    } else {
        res.send('<h1> Sorry - Not Found !! </h1>')
    }
    
})

// retrieve product by name
app.get('/products/:name', (req, res) => {
    if(req.params.name) {
    const product = control.getProductByName(req.params.name).then(product => {
        res.send(product)
    })
    } else {
        res.send('<h1> Sorry - Not Found !! </h1>')
    }
    
})

// retrieve product by name
app.get('/all', (req, res) => {
    const product = control.getProducts().then(products => {
        res.send(products)
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