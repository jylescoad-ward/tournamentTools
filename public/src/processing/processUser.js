module.exports = async function(nameGiven) {
	if (!PUBG_connectionWorking) return;
	try {
		const data = await PUBG_api.getPlayers({names: nameGiven})
		data.forEach((p) => {
			console.div(`[PUBG_API] [processUser] Processed User "${p.attributes.name}"`)
		})
		return data;
	} catch(e) {
		console.div(`[PUBG_API] [processUser] An Error Occurred, Check Console.`);
		console.error(e);
	}
}

var $ = require("jquery");
$(document).ready(()=>{
	function handleFileSelect(evt){
		$("#processUser-submit").click(()=>{
			custLoader.show()
			custLoader.context("Preparing to Process User...");
			var f = document.getElementById("uploadPastUser_file").files[0]

			var reader = new FileReader();
			reader.onload = ((theFile)=>{
				custLoader.context("Processing User");
				return function(e) {
					var parsedJSON = JSON.parse(e.target.result)
					$("#viewDataField").html(require("./UserToHTML.js").force(parsedJSON));
					custLoader.context("Processed User");
					console.log("[processUser] Parsed Match",parsedJSON);
				};
			})(f);
			reader.readAsText(f);
			custLoader.hide()
		})
	}
	document.getElementById('uploadPastUser_file').addEventListener('change', handleFileSelect, false);
})
