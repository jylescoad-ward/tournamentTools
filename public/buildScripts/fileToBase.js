'use strict';

const fs = require("fs");

console.log(process.argv[2])

fs.readFile(process.argv[2],'utf8',(err,f)=>{
    var buf = Buffer.from(f);
    var encodedData = buf.toString('base64');


    console.log("-------- BASE64 --------")
    console.log(encodedData);
})
