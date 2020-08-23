const fs = require("fs");
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

function parseMatch(d) {
	d = JSON.parse(d);
	
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
fs.readFile("test.json", 'utf8',async (e,d)=>{
	const parsedMatch = await parseMatch(d);
	
	var metadataTable = `
<table>
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
		
		<tr>
			<th scope="row">${t.metadata.stats.rank}</th>
			<td>team_${t.players[0].attributes.stats.name}</td>
			<td>${totalScore}</td>
			<td></td>
		</tr>
		${players};
		`;
		innerTableRoster[t.metadata.stats.rank - 1] = teamReturn;
	})
	
	var innerRosterComplete="<h1>Roster</h1>";
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
	<link href="style.css" rel="stylesheet">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
	<div clas="match metadata">
		${metadataTable}
	</div>
	<div class="match roster">
		${matchRoster}
	</div>
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	`;
	
	fs.writeFile("out.html",finalHTMLOut,(e)=>{
		if (e) return console.log(e);
		console.log("written website file");
	})
	
	fs.writeFile("parsedMatch.json",JSON.stringify(parsedMatch,null,"\t"), (e)=>{
		if (e) return console.log(e);
		console.log("done!")
	})
})





