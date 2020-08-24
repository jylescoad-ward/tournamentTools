function filterArray(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}
/*async function writeFile(location, content){
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
}*/

function parseMatch(d) {
	//d = JSON.parse(d);

	var rosterCompiled = [];

	d.rosters.forEach((d) => {
		var teamData = d.attributes;
		var teamPlayers = [];


		d.participants.forEach((p) => {
			teamPlayers[p.attributes.stats.killPlace] = p;
		})

		var returnValue = {
			metadata: teamData,
			players: teamPlayers.filter((obj)=>obj),
		}

		returnValue.metadata.id = d.id;

		rosterCompiled[d.attributes.stats.rank] = returnValue;
	})

	var finalResult = {
		metadata: d.attributes,
		teams: rosterCompiled.filter((obj) => obj),
	}

	return finalResult;

	/*fs.writeFile("rosterCompiled.json",JSON.stringify(rosterCompiled.filter((obj)=>obj),null,"\t"), (e)=>{
		if (e) return console.log(e);
		console.log("done!")
	})*/
}

async function gimmieMatch(d) {
//fs.readFile("test.json", 'utf8',async (e,d)=>{
	const parsedMatch = await parseMatch(d);

	var metadataTable = `
<table class="table table-responsive table-sm">
	<tr>
		<th>Match Metadata</th>
	</tr>
	<tr>
		<th>Map</th>
		<td>${parsedMatch.metadata.mapName}</td>
	</tr>
	<tr>
		<th>Custom Match</th>
		<td>${parsedMatch.metadata.isCustomMatch}</td>
	</tr>
	<tr>
		<th>Gamemode</th>
		<td>${parsedMatch.metadata.gameMode}</td>
	</tr>
</table>
	`;


	var innerTableRoster=[];
	parsedMatch.teams.forEach(async(t)=>{
		var players="";
		var teamScore=0;
		var totalKills=0;
		var totalAssists=0;
		t.players.forEach((p) => {
			totalKills+=p.attributes.stats.kills
			totalAssists+=p.attributes.stats.assists
			players+=`
			<tr>
				<td class="blank"></td>
				<td>${p.attributes.stats.name}</td>
				<td>${p.attributes.stats.kills}</td>
				<td>
					<td class="playerspec">${p.attributes.stats.longestKill}</td>
					<td class="playerspec">${p.attributes.stats.assists}</td>
					<td class="playerspec">${p.attributes.stats.damageDealt}</td>
					<td class="playerspec">${p.attributes.stats.walkDistance+p.attributes.stats.swimDistance+p.attributes.stats.rideDistance}</td>
					<td class="playerspec">${p.attributes.stats.revives}</td>
					<td class="playerspec">${p.attributes.stats.heals}</td>
				</td>
			</tr>
			`;
		});

		totalScore = (totalKills*2)+totalAssists;

		var teamReturn = `

		<tr class="team">
			<th scope="row">${t.metadata.stats.rank}</th>
			<td>team_${t.players[0].attributes.stats.name}</td>
			<td>${totalKills.toString()}</td>
			<td>${totalScore.toString()}</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		${players};
		`;
		innerTableRoster[t.metadata.stats.rank - 1] = teamReturn.replace(";","");
	})

	var innerRosterComplete=" ";
	innerTableRoster.forEach((r)=>{
		innerRosterComplete+=r;
	})

	var matchRoster = `
	<table class="table table-sm">
		<thead>
			<tr>
				<th scope="col">Team Placement</th>
				<th title="Team Name is the player with the highest score" scope="col">Team/Player Name</th>
				<th scope="col">Total Kills</th>
				<th scope="col">Total Score</th>
				<th scope="col">Player-Specific Metadata</th>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td>
							<th scope="col" class="playerspec">Longest Kill (meters)</th>
							<th scope="col" class="playerspec">Assists</th>
							<th scope="col" class="playerspec">Damage Dealt</th>
							<th scope="col" class="playerspec">Distance Travled</th>
							<th scope="col" class="playerspec">Revives</th>
							<th scope="col" class="playerspec">Heals</th>
				</td>
			</tr>
		</thead>
		<tbody>
			${innerRosterComplete}
		</tbody>
	</table>
	`;

	var finalHTMLOut = `
	<div clas="match metadata">
		${metadataTable}
	</div>
	<hr>
	<div class="match roster">
		${matchRoster}
	</div>
	`;

	return finalHTMLOut;
	/*
	fs.writeFile("out.html",finalHTMLOut,(e)=>{
		if (e) return console.log(e);
		console.log("written website file");
	})

	fs.writeFile("parsedMatch.json",JSON.stringify(parsedMatch,null,"\t"), (e)=>{
		if (e) return console.log(e);
		console.log("done!")
	})*/
}

var $ = require("jquery");
async function setThing(data){
	$("#view_data_currentlyViewing_short").html("Not Viewing Anything");
	console.div("[MatchToHTML] Processing Request...");
	$("#view_data_currentlyViewing_short").html("Processing Request");
	$("#viewDataField").html("<h1>Processing a request. Please Wait</h1>");
	const result = await gimmieMatch(data);
	if (data.metadata === undefined){
		$("#view_data_currentlyViewing").html(`Match: ${data.id}`)
	} else {
		$("#view_data_currentlyViewing").html(`Match: ${data.metadata.id}`)
	}

	$("#viewDataField").html(result);
		console.div("[MatchToHTML] Processed Request.");
		$("#view_data_currentlyViewing_short").html("Ready to View a Match");
}
module.exports = function(data) {
	$("#processMatch-view").click(async () => {
		setThing(data)
	});
}

module.exports.force = function(data){
	setThing(data);
}
