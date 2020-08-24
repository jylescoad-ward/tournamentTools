module.exports = async function(matchID) {
	if (!PUBG_connectionWorking) return;

	console.div("[PUBG_API] [processMatch] Checking MatchID");
	const res = await PUBG_api.getMatch({ id: matchID })
	if (res.id !== matchID) {
		console.div("[PUBG_API] [processMatch] MatchID may be incorrect?");
		console.div("[PUBG_API] [processMatch] An error might have occured. Check console for more information.");
		return true;
	} else {
		console.div("[PUBG_API] [processMatch] MatchID Valid",res);
		return res;
	}
}

var $ = require("jquery");
function handleFileSelect(evt){
	$("#processMatch-submit").click(()=>{
		var f = document.getElementById("uploadPastMatch_File").files[0]

		var reader = new FileReader();
		reader.onload = ((theFile)=>{
			return function(e) {
				var parsedJSON = JSON.parse(e.target.result)
				$("#viewDataField").html(require("./MatchToHTML.js").force(parsedJSON));
				console.log("[processMatch] Parsed Match",parsedJSON);
			};
		})(f);
		reader.readAsText(f);
	})
}

document.getElementById('uploadPastMatch_File').addEventListener('change', handleFileSelect, false);
