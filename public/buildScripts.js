/*
-	tournamentTools buildScripts v0.2	-
-	   Created 27th September 2020   	-
-	   Edited  28th September 2020   	-

	     2020(c) Jyles Coad-Ward
*/


const fs = require("fs");
const path = require("path")
const webpack = require("webpack")
const archiver = require('archiver')
const md5 = require("md5")


var parameters = {
	ranFromCLI: process.argv[1].includes("buildScripts"),
}

// Functions
var f = {};

// Webpack Compile
function compile(configLocation) {
	const compiler = webpack(require(configLocation))
	compiler.run((err,stats)=>{
		if(err) throw err;
		console.log(`## Compiled "${stats.compilation.options.name}" (${stats.compilation.outputOptions.filename}) in ${stats.endTime - stats.startTime}ms`);
	})
}

f.packFolder = (folderToPack,packedFileLocation)=>{
	var file_system = require('fs');

	var output = file_system.createWriteStream(packedFileLocation);
	var archive = archiver('zip');

	output.on('close', function () {
		console.log(`${packedFileLocation} - ${archive.pointer()} bytes`);
	});

	archive.on('error', function(err){
	    throw err;
	});

	archive.pipe(output);

	// append files from a sub-directory and naming it `new-subdir` within the archive (see docs for more options):
	archive.directory(folderToPack, false);
	archive.finalize();
}

f.incrementPackage = ()=>{
	const file = require('./package.json');
    file.build.number++;
    var curDate = new Date();
    file.build.date = `${curDate.getFullYear()}_${curDate.getMonth()}_${curDate.getDate()}`;
    file.build.timestamp = Math.round(curDate.valueOf()/1000);

    fs.writeFile("./package.json", JSON.stringify(file,null,"\t"), function writeJSON(err) {
        if (err) throw err;
        console.log("## Incremented Package Build");
    });
	return;
}
f.fileMD5 = (fileToRead)=>{
	var retVal = "";
	fs.readFile(fileToRead, function(err, buf) {
		if(err) throw err;
		retVal = buf;
	});
	return md5(retVal);
}

f.preBuild = ()=>{
	fs.readdir("dist/",(e,files)=>{
		files.forEach((f)=>{
			if (f.endsWith(".js")) {
				fs.unlink(`dist/${f}`,(e)=>{
					console.log(`Removed "dist/${f}"`)
				})
			}
		})
	})
	console.log("## Removed old bundle(s)")
	f.incrementPackage();
	return;
}

f.postBuild = async ()=>{
	/*
	== task list ==
		- pack up dist and src folders
		- calculate md5 of archives
		- append this release to history.csv
		- print md5
	*/
	// Pack soruce and dist folders.
	var fN = {
		src: `release/${require("./package.json").build.number}-src.zip`,
		dist: `release/${require("./package.json").build.number}-dist.zip`,
		history: `release/history.csv`
	};

	// zip up files
	f.packFolder("src/",`${fN.src}`);
	f.packFolder("dist/",`${fN.dist}`);


	// append to history csv
	var historyDataToAppend = `\r\n${require("./package.json").build.number},${require("./package.json").build.timestamp},${require("os").userInfo().username},${f.fileMD5(fN.src)},${f.fileMD5(fN.dist)}`
	fs.appendFileSync(fN.history,historyDataToAppend,(e)=>{
		if(e)throw e;
		console.log("## Added current version to history");
	});

	// print md5
	console.log("========================================");
	console.log(`${f.fileMD5(fN.src)} \n\r ${fN.src}\n\r `);
	console.log(`${f.fileMD5(fN.dist)} \n\r  ${fN.dist}\n\r `);
	console.log("========================================");
}

module.exports = f;

// Check if program is being ran from cli
if (parameters.ranFromCLI){
	menu();
}

async function menu(){
	switch (process.argv[2]) {
		case "incrementPackage":
			f.incrementPackage();
			break;
		case "preBuild":
			f.preBuild();
			break;
		case "postBuild":
			f.postBuild();
			break;
		case "build":
			f.preBuild();
			compile("./webpack.config.js");
			f.postBuild();
			break;
		case "test":
			f.preBuild();
			compile("./webpack.config.js");
			break;
		case "b64":
				if (process.argv[3] === undefined) {
					console.log("no file given, aborting...");
					process.exit(2);
				}
				fs.readFile(process.argv[3],'utf8',(err,f)=>{
					console.log("-------- BASE64 --------\r\n",Buffer.from(f).toString('base64'))
				})
			break;
		default:
			throw "No buildScript was defined.";
			break;
	}
}

//
