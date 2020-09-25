var $ = require("jquery");

async function exportMatch(dat) {
	try {
		custLoader.show()
		$("#processMatch-download").hide();
		$("#processMatch-view").hide();
		$("#view_data_currentlyViewing_short").html("Not Viewing Anything");
		console.div("[exportMatch] Checking Fields");
		if (dat.length !== 36) {
			console.div("[PUBG_API] Invalid MatchID");
			custLoader.hide()
		} else {
			var result = await require("./processMatch.js")($("#processMatch-id").val());
			if (result === true) {
				console.div("[PUBG_API] An Error Occured. You should check the console.");
				custLoader.hide()
				return;
			} else {
				// Fade in stuff
				$("#processMatch-download").fadeIn("fast");
				$("#processMatch-view").fadeIn("fast");
				$("#matchExportSettings").fadeIn("fast");

				console.div("[exportMatch] Match Ready to Download or View");

				match.download(result);

				$("#processMatch-view").click(()=>{
					$("#view_data_currentlyViewing_short").html("Ready to View a Match");
				})
				require("./MatchToHTML.js")(result);
				custLoader.hide();
			}
		}
	} catch(e) {
		console.div("[exportMatch] An Error Occurred, Check Console");
		console.error(e);
	}
}

module.exports = function(){

	if (!PUBG_connectionWorking) return;

	$("#processMatch-submit").click(async (dt) => {
		exportMatch($("#processMatch-id").val());
	})
	$("#viewUser_selectMatch").click(async () => {
		exportMatch($(this).prop("name"));
	})
}();
