var $ = require("jquery");
var md5 = require("md5");
var moment = require("moment");

module.exports = async function() {
	if (!PUBG_connectionWorking) return;

	$("#exportMatchRAW-submit").click(() => {
		try {
			console.div("[PUBG_API] [exportMatch] Checking Fields");
			if ($("#exportMatchRAW-id").val().length !== 36) {
				console.div("[PUBG_API] [exportMatch] Invalid MatchID");
			} else {
				PUBG_api.getMatch({ id: $("#exportMatchRAW-id").val() }).then((res) => {
					console.log(res);
					if (res.id === undefined) {
						console.div("[PUBG_API] [exportMatch] An error might have occurred, Check Console");
					} else {
						console.div("[PUBG_API] [exportMatch] Match Fetched Successfully");
						$("#exportMatchRAW-download").show();
						$("#exportMatchRAW-view").show();

						//let matchTime = new Date(res.attributes.createdAt).getTime())/1000;
						var dsFN_o = {
							"antiDupePrefix": randomString(16),
							"matchTime": moment(res.attributes.createdAt).unix(),
							"hash": md5("id_"+res.id),
						};
						//var downloadString_fileName = `match-${dsFN_o.antiDupePrefix}-${dsFN_o.matchTime}-${dsFN_o.hash}.json`
						var downloadString_fileName = `match-${dsFN_o.antiDupePrefix}-${dsFN_o.matchTime}.json`;
						$("#exportMatchRAW-download").click(() => {
							downloadString(downloadString_fileName,JSON.stringify(res));
							console.div("[PUBG_API] [exportMatch] Downloaded Match "+res.id);
						})
					}
				});
			}
		} catch(e) {
			console.div("[PUBG_API] [exportMatch] An Error Occurred, Check Console");
			console.error(e);
		}
	})
}();
