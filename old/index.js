const fs = require('fs');

if (!fs.existsSync("config.json")) {
	console.error("config.json does not exist, please create it or redownload from github <3");
	process.exit()
}

const config = require('./config.json');
const battlegrounds = require('battlegrounds');
const math = require('mathjs');
const signale = require('signale');
var api = new battlegrounds(config.api_key);
var argv = process.argv;

switch (config.api_key) {
	case 'not_set':
		setup();
		process.exit();
}
switch (argv[2].split("\r").join("")) {
	case '-m':
	case '--export-match-data':
		signale.info('This might take a bit...');
		match_get()
		break;
	case '-mu':
	case '--latest-match-from-username':
		signale.info('This might take a bit...');
		match_get_username()
		break;
	case '-mhtml':
	case '--match-export-to-html':
		signale.info('This might take a bit...');
		match_get_html()
		break;
	case '-muhtml':
	case '--match-export-to-html-from-username':
		signale.info('This might take a bit...');
		match_get_html_username()
		break;
	case '-p':
	case '--get-player-info':
		user(argv[3]).then(function(result) {
			console.log(result)
		})
		break;
	case '-c':
	case '--cleanup':
		cleanup()
		break;
	case '-s':
	case '--setup':
		setup()
		break;
	case '-h':
	case '--help':
		help();
		break;
	default:
		console.log("No Valid Arguments Recognised, Try './tool --help' or 'node js --help'");
		process.exit();
		break;
}

//Vital Functions to make the thing work
async function match(id_given) {
  	try {
		let matchid = id_given;
		const res = await api.getMatch({ id: matchid });
		var json_array = [];
		json_array[0] = "Rank,Placement Points,Kills,,Total Points,,Member 1,Member 2,Member 3,Member 4,,Squad ID,,Member 1 kills,Member 2 kills,Member 3 kills,Member 4 kills,,Member 1 ID,Member 2 ID,Member 3 ID,Member 4 ID";

		let squadcount = res.rosters.length;
		var i = 0;
		while (i < squadcount) {

			let position = res.rosters[i].attributes.stats.rank;
			let squadid = res.rosters[i].id;
			let membercount = res.rosters[i].participants.length;
			//kills,name,id
			let member1 = [0, "", ""];
			let member2 = [0, "", ""];
			let member3 = [0, "", ""];
			let member4 = [0, "", ""];

			let m = 0;
			while (m !== membercount) {
				switch (m) {
					case 0:
						member1[0] = res.rosters[i].participants[m].attributes.stats.kills;
						member1[1] = res.rosters[i].participants[m].attributes.stats.name;
						member1[2] = res.rosters[i].participants[m].id;
						break;
					case 1:
						member2[0] = res.rosters[i].participants[m].attributes.stats.kills;
						member2[1] = res.rosters[i].participants[m].attributes.stats.name;
						member2[2] = res.rosters[i].participants[m].id;
						break;
					case 2:
						member3[0] = res.rosters[i].participants[m].attributes.stats.kills;
						member3[1] = res.rosters[i].participants[m].attributes.stats.name;
						member3[2] = res.rosters[i].participants[m].id;
						break;
					case 3:
						member4[0] = res.rosters[i].participants[m].attributes.stats.kills;
						member4[1] = res.rosters[i].participants[m].attributes.stats.name;
						member4[2] = res.rosters[i].participants[m].id;
						break;
				}
				m++;
			}

			let totalkills;
			switch (membercount) {
				case 0:
					totalkills = member1[0];
					break;
				case 1:
					totalkills = math.add(member1[0], member2[0]);
					break;
				case 2:
					totalkills = math.add(member1[0], member2[0], member3[0]);
					break;
				case 3:
					totalkills = math.add(member1[0], member2[0], member3[0], member4[0]);
					break;
				case 5:
					totalkills = math.add(member1[0], member2[0], member3[0], member4[0]);
					break;
			}

			let placementpoints;
			switch (position) {
				case 1:
					placementpoints = 10;
					break;
				case 2:
					placementpoints = 6;
					break;
				case 3:
					placementpoints = 5;
					break;
				case 4:
					placementpoints = 4;
					break;
				case 5:
					placementpoints = 3;
					break;
				case 6:
					placementpoints = 2;
					break;
				case 7:
					placementpoints = 1;
					break;
				case 8:
					placementpoints = 1;
					break;
				default:
					placementpoints = 0;
					break;
			}

			if (totalkills == undefined) {
				totalkills = 0;
			}
			if (placementpoints == 0) {
				placementpoints = 0;
			}

			json_array[position] = "\n" + position + "," + placementpoints + "," + totalkills + ",," + math.add(totalkills, placementpoints) + ",," + member1[1] + "," + member2[1] + "," + member3[1] + "," + member4[1] + ",," + squadid + ",," + member1[0] + "," + member2[0] + "," + member3[0] + "," + member4[0] + ",," + member1[2] + "," + member2[2] + "," + member3[2] + "," + member4[2];

			i++;
		}

		let datecombinestring = new Date(Date.parse(res.attributes.createdAt)).toLocaleDateString("en-AU") + " " + new Date(Date.parse(res.attributes.createdAt)).toLocaleTimeString("en-AU")

		json_array[json_array.length] = "\n\n\nMatch Start," + datecombinestring;
		json_array[json_array.length + 1] = "\nMatch Duration," + new Date(res.attributes.duration * 1000).toISOString().substr(11, 8)
		return json_array;

	} catch (err) {
		console.log('error:')
		console.log(err)
		setTimeout(function () { console.log("error") }, 2000)
	}
}
async function user(uname_given){
	let final;
	try {
		var res = await api.getPlayers({ names: [uname_given] });
		final = {
			"name": res[0].id,
			"id": res[0].attributes.name,
			"latest_matchID": res[0].matches[0].id,
			"matches": JSON.stringify(res[0].matches)
		};
	} catch (err) {
		signale.error(err.errors[0].title + err.errors[0].detail)
		process.exit()
		final = false;
	}
	return final;
}

//Command Related Functions, Heaps cool tbh
function match_get() {
	if (argv.length !== 4) {
		process.on('exit', function (code) {
			signale.error("No MatchID Given or Too many arguments given.\n\nTry;\n./tool -m [PUBG MatchID]");
		})
	} else {
		require('./export.js').csv(argv[3]);
	}
}
async function match_get_username() {
	if (argv.length !== 4) {
		process.on('exit', function (code) {
			signale.error("No Username Given or Too many arguments given.\n\nTry;\n./tool -mu [PUBG Username]");
		})
	} else {
		try{
			user(argv[3]).then(async function (result_) {
				back_export_csv(result_.latest_matchID);
			})
		} catch (err) {
			console.log(err)
		}
	}
}
function match_get_html() {
	if (argv.length !== 4) {
		process.on('exit', function (code) {
			return console.error("No MatchID Given or Too many arguments given.\n\nTry;\n./tool -mhtl [PUBG MatchID]");
		})
	} else {
		require('./export.js').html(argv[3]);
	}
}
async function match_get_html_username() {
	if (argv.length !== 4) {
		process.on('exit', function (code) {
			signale.error("No Username Given or Too many arguments given.\n\nTry;\n./tool -muhtml [PUBG Username]");
		});
	} else {
		try {
			user(argv[3]).then(async function (result_) {
				back_export_html(result_.latest_matchID);
			})
		} catch(err){
			console.log(err)
		}
	}
}

//Vital Functions to make the thing work
async function back_export_csv(matchID){
  signale.warn("This will spit all data that will be written to a .csv file in this directory");
  match(matchID).then(function (result_) {
    let outfile = "pubg_match_" + matchID + ".csv"
    writeFile(outfile, result_)
  })
}
async function back_export_html(matchID) {
		signale.warn("This will spit all data that will be written to a .html file in this directory");
    try {
      match(matchID).then(function (result) {
        let final = result;
        let head = `
<!DOCTYPE html>
<html>
<head>
<link href="html/style.css" type="text/css" rel="stylesheet" />
<meta charset="UTF-8" />
<meta name="copyright" content="Copyright 2020 Jyles Coad-Ward and Associates." />
</head>
<body>
<table>
        `;
        let end = `
</table>
</body>
</html>`;
        let tablehead = result[0];
        tablehead = '<tr class="head"><th>' + tablehead.split(",").join("</th><th>") + "</th></tr></div>";
        let table = head + tablehead;
        final[0] = "";
        let i=1;
        while(i < final.length) {
          if (final[i] !== undefined) {
            table = table + "<tr><td>" + final[i].split(",").join("</td><td>") + "</td></tr>"
          }
          i++
        }
        table = table + end;

        //replace thing here
        let outfile = "pubg_match_" + matchID + ".html";

        writeFile(outfile, table);
      })
    } catch (err){ console.error(err) }
}
async function writeFile(location, content){
	if (fs.existsSync(location)) {
		fs.unlink(location, (err) => {
			if (err) {
				console.error(err)
				return;
			}
		})
	}

	const { exec } = require("child_process");
	exec("touch " + location)

	fs.appendFile(location, content, function (err) {
		if (err) throw err;
		setTimeout(function () { console.log();signale.success('written to ' + location) }, 2000)
	});
	return true;
}

async function setup(){

	const readline = require("readline");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	console.log("Welcome to the PUBG-Node Setup, All i'll be asking for is the PUBG API Key,")
	console.log("A link to where you can find it is here; https://developer.pubg.com/")
	console.log("Click on 'Get Your own API Key' and follow the instructions.")
	console.log("\nOnce that is done please paste your key in here and press enter so\nI can validate it!")

	rl.question("API Key: ", async function (key_given) {
		const testapi = new battlegrounds(key_given);
		try {
			const res = await testapi.getPlayers({ names: ["xSuperSeed"] });
		} catch (err) {
			if (err.errors[0].title === "Unauthorized") {
				console.log("Incorrect API Key, Aborting...")
				rl.close();
			}
		}
		console.log("\n\nCongratulations!\nYour API Key is valid so its going to be saved and \nit will *overwrite* the current API Key in config.json");

		let outcontent = JSON.stringify({ "api_key": key_given });

		fs.writeFile("config.json", outcontent, function (err) {
			if (err) throw err;
			console.log('saved api key');
			rl.close();
		});
	});
}
function cleanup(){
	const readline = require("readline");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	signale.warn("This function will delete ALL match data in this directory")
	rl.question("Are You sure? [y/N] ", async function (option) {
		switch (option) {
			case 'y':
			case 'Y':
				signale.await("Deleting ALL match data...");

				let script_rm = 'rm -v pubg_match_*';
				let script_check = 'ls -1q pubg_match*';

				const util = require('util');
				const exec = util.promisify(require('child_process').exec);

				try {
					const { stdout_check, stderr_check } = await exec(script_check);
				} catch (err) {
					if(err.stderr.includes('ls: pubg_match*: No such file or directory')) {
						signale.error("No Match Files Found.");
						rl.close();
						process.exit();
					}
					signale.error("Error;");
					console.log(err.stderr);
					rl.close();
					process.exit();
				}


				const { stdout_rm, stderr_rm } = await exec(script_rm).then(function() {
					signale.success("Cleanup Successful");
					rl.close();
					process.exit();
				});
				break;
			default:
			case 'n':
			case 'N':
				rl.on("close", function () {
					console.log("Aborting Process...");
					process.exit(0);
				})

				rl.close();
				break;
		}
	})
}
function help(){
	console.log("  _    _   ______   _        _____ ")
	console.log(" | |  | | |  ____| | |      |  __ \\ ")
	console.log(" | |__| | | |__    | |      | |__) |")
	console.log(" |  __  | |  __|   | |      |  ___/ ")
	console.log(" | |  | | | |____  | |____  | |     ")
	console.log(" |_|  |_| |______| |______| |_|    ")
	console.log("\n")
	console.log("### Export Match Data to .csv File")
	console.log("./tool -m [matchID]")
	console.log("       --export-match-data [matchID]")
	console.log("(replace [matchID] with a valid PUBG MatchID)")
	console.log()
	console.log("### Export Match Data from Username to .csv File")
	console.log("./tool -mu [username]")
	console.log("       --latest-match-from-username [username]")
	console.log("(replace [username] with a valid PUBG MatchID)")
	console.log()
	console.log("### Export MatchID as HTML Table")
	console.log("./tool -mhtml [matchID]")
	console.log("       --match-export-to-html [matchID]")
	console.log("(replace [matchID] with a valid PUBG MatchID)")
	console.log()
	console.log("### Export MatchID as HTML Table")
	console.log("./tool -muhtml [username]")
	console.log("       --match-export-to-html-from-username [username]")
	console.log("(replace [username] with a valid PUBG MatchID)")
	console.log()
	console.log("### Get Player Info")
	console.log("./tool -p [username]")
	console.log("       --get-player-info [username]")
	console.log("(replace [username] with a valid PUBG username)")
	console.log()
	console.log("### Get Latest MatchID from Username")
	console.log("./tool -lm [username]")
	console.log("       --get-latest-matchid-from-username [username]")
	console.log("(replace [username] with a valid PUBG username)")
	console.log()
	console.log("### .csv Cleanup")
	console.log("./tool -c")
	console.log("       --cleanup")
	console.log()
	console.log("### Setup")
	console.log("./tool -s")
	console.log("       --setup")
	console.log()
	console.log("### Help")
	console.log("./tool -h")
	console.log("       --help")
}
