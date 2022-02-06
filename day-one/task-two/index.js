
const http = require('http'); 
const fs = require('fs')  

http.createServer(function async(req, res) {

    
res.writeHead(200, {'Content-Type': 'text/html'}); 
    const {students} = JSON.parse(fs.readFileSync("./students.json"));
    console.log(req.url.split('/')[2]*1)
    if(req.url === "/home") {
        var html = fs.readFileSync('./index.html');
        res.write(html);    
    }
    else if (req.url === "/students"){
        res.write(JSON.stringify(students))
    }else{
        if(req.url.split('/')[2]*1){
            try {
                res.write(JSON.stringify(students[req.url.split('/')[2]*1]))

            } catch (error) {
                res.write(error.message)                
            }
        }
        res.write("not found")
    }
        
    res.end();
  
}).listen(5000);
  
console.log('server at port 8080 is running..')