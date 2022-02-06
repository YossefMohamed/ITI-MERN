
const http = require('http'); 
const fs = require('fs')  

http.createServer(function async(req, res) {
   if(req.url === "/iti"){
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    var htmlPage = fs.readFileSync('./index.html');
    res.write(htmlPage)
    var image = fs.readFileSync('./iti.png');
    res.writeHead(200,{'content-type':'image/jpg'});
    res.write(image)

    res.end()
   }
}).listen(5000)