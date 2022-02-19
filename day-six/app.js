const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/users');
const todos = require('./routes/todos');

const app = express();
const port = 9003;
const db = 'mongodb://localhost:27017/todosysDB';

app.use(cors({origin: "*"}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true }).then((res)=> {
    console.log("DB Connected!!")
})

app.use('/users', users);

app.use('/todos', todos);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to our to-do management system !</h1>');
});

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
    `press Ctrl-C to terminate.`));
