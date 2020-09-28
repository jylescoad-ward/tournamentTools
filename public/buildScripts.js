/*

	tournamentTools buildScripts v0.1
		27th September 2020

	Copyright 2020 Jyles Coad-Ward
*/

// Check if program is being ran from cli

const fs = require("fs");
const webpack = require("webpack")

var parameters = {
	ranFromCLI: process.argv[1].includes("buildScripts.js"),
}

if (parameters.ranFromCLI){
	switch (process.argv[2]) {
		case "generateDemo":
			funk.genPubDemo();
			break;
		default:

			break;
	}
} else {
	throw "buildScripts can only be ran from the file itself with the `node` executable."
}


// Functions

var funk = {}

function compile(configLocation) {
	const compiler = webpack(require(configLocation))
	compiler.run((err,stats)=>{
		if(err) throw err;
		console.log(stats);
	})
}

compile("./demo.webpack.config.js")

funk.genPubDemo = ()=>{
	compile("./demo.webpack.config.js");
	fs.unlink("./../demo/",(e)=>{
		if (e) throw e;
		console.log("deleted demo directory")
	})
}

module.exports = funk;
