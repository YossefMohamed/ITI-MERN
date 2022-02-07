const { sum, add, total, show } = require("./cont");

const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require("body-parser")


const app = express();


app.use(bodyParser.urlencoded({
    extended:true
}));

const data = JSON.parse(fs.readFileSync('products.json'));

console.log(show())
add(5)
add(5)
add(5)
add(5)
add(5)
console.log(sum())
console.log(total())
console.log(show())



app.get("/" , (req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
})


app.get("/products:id" , (req,res) => {
    res.send(`<h1>${data[req.params.id*1].name}</h1><h1>${data[req.params.id*1].price}</h1>`)
})


app.get("/iti" , (req,res) => {
    res.send("iti aswan");
})


app.get("/login" , (req,res) => {
    res.send(`hi ${req.query.username} your password is ${req.query.password} from GET thank you`)

})


app.post("/login" , (req,res) => {
    res.send(`hi ${req.body.username} your password is ${req.body.password} from POST thank you`)

})
app.listen(3000)