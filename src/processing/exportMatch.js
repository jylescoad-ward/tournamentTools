var $ = require("jquery");
var md5 = require("md5");

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
						$("#exportMatchRAW-download").click(() => {
							downloadString(`match-${md5(res.id)}.json`,JSON.stringify(res)).then(() => {
								$("#exportMatchRAW-download").show();
								$("#exportMatchRAW-view").show();
							});
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
