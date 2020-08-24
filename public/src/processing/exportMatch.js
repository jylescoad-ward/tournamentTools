var $ = require("jquery");
var md5 = require("md5");
var moment = require("moment");

module.exports = function() {
	if (!PUBG_connectionWorking) return;

	$("#processMatch-submit").click(async () => {
		try {
			$("#processMatch-download").hide();
			$("#processMatch-view").hide();
			$("#view_data_currentlyViewing_short").html("Not Viewing Anything");
			console.div("[exportMatch] Checking Fields");
			if ($("#processMatch-id").val().length !== 36) {
				console.div("[PUBG_API] [exportMatch] Invalid MatchID");
			} else {
				var result = await require("./processMatch.js")($("#processMatch-id").val());
				if (result === true) {
					console.div("[PUBG_API] [exportMatch] An Error Occured. You should check the console.");
					return;
				} else {
					$("#processMatch-download").show();
					$("#processMatch-view").show();

					var dsFN_o = { "antiDupePrefix": randomString(16), "matchTime": moment(result.attributes.createdAt).unix(), "hash": md5("id-"+result.id+" t-"+moment(result.attributes.createdAt).unix()), };
					var downloadString_fileName = `match-${dsFN_o.antiDupePrefix}-${dsFN_o.matchTime}.json`;
					console.div("[exportMatch] Match Ready to Download or View");
					$("#processMatch-view").click(()=>{
						$("#view_data_currentlyViewing_short").html("Ready to View a Match");
					})
					require("./MatchToHTML.js")(result)
					$("#processMatch-download").click(() => {
						downloadString(downloadString_fileName,JSON.stringify(result,null,"\t"));
						console.div("[exportMatch] Downloaded Match "+result.id);
					})
				}
			}
		} catch(e) {
			console.div("[PUBG_API] [exportMatch] An Error Occurred, Check Console");
			console.error(e);
		}
	})
}();
