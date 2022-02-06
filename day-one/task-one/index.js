const fs = require('fs')

fs.readFile("./students.json", 'utf8', function(err, data){
    if (err) 
        console.log(err); 
    else 
    console.log(JSON.parse(data).students);
});