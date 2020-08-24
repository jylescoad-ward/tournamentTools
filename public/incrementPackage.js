const fs = require('fs');
const fileName = './package.json';
const file = require(fileName);

file.build.number++;
var curDate = new Date();
file.build.date = `${curDate.getFullYear()}_${curDate.getMonth()}_${curDate.getDate()}`;
file.build.timestamp = Math.round(curDate.valueOf()/1000);

fs.writeFile(fileName, JSON.stringify(file,null,"\t"), function writeJSON(err) {
  if (err) return console.log(err);
  console.log('writing to ' + fileName);
});