var $ = require("jquery");
var md5 = require("md5");
var moment = require("moment");

module.exports = function() {
	if (!PUBG_connectionWorking) return;

	$("#exportMatchRAW-submit").click(async () => {
		try {
			console.div("[PUBG_API] [exportMatch] Checking Fields");
			if ($("#exportMatchRAW-id").val().length !== 36) {
				console.div("[PUBG_API] [exportMatch] Invalid MatchID");
			} else {
				var result = await require("./processMatch.js")($("#exportMatchRAW-id").val());
				if (result === true) {
					console.div("[PUBG_API] [exportMatch] An Error Occured.");
					return;
				} else {
					$("#exportMatchRAW-download").show();
					$("#exportMatchRAW-view").show();

					var dsFN_o = { "antiDupePrefix": randomString(16), "matchTime": moment(result.attributes.createdAt).unix(), "hash": md5("id-"+result.id+" t-"+moment(result.attributes.createdAt).unix()), };
					var downloadString_fileName = `match-${dsFN_o.antiDupePrefix}-${dsFN_o.matchTime}.json`;
					console.div("[PUBG_API] [exportMatch] Match Ready to Download or View");
					require("./MatchToHTML.js")(result)
					$("#exportMatchRAW-download").click(() => {
						downloadString(downloadString_fileName,JSON.stringify(result,null,"\t"));
						console.div("[PUBG_API] [exportMatch] Downloaded Match "+result.id);
					})
				}
			}
		} catch(e) {
			console.div("[PUBG_API] [exportMatch] An Error Occurred, Check Console");
			console.error(e);
		}
	})
}();
