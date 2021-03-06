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
			var f = document.getElementById("uploadPastUser_file").files[0]

			var reader = new FileReader();
			reader.onload = ((theFile)=>{
				return function(e) {
					var parsedJSON = JSON.parse(e.target.result)
					$("#viewDataField").html(require("./UserToHTML.js").force(parsedJSON));
					console.log("[processUser] Parsed User",parsedJSON);
				};
			})(f);
			reader.readAsText(f);
			custLoader.hide()
		})
	}
	document.getElementById('uploadPastUser_file').addEventListener('change', handleFileSelect, false);
})
