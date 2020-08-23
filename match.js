const fs = require("fs");

fs.readFile("test.json", 'utf8',(e,d) => {
	
	d = JSON.parse(d)
	
	console.log(d.attributes)
})

