var $ = require("jquery");
var md5 = require("md5");

module.exports = async function() {
	if (!PUBG_connectionWorking) return;

	$("#exportUserRAW-submit").click(() => {
		try {
			console.div("[PUBG_API] [exportUser] Checking Fields");
			if ($("#exportUserRAW-id").val().length === 0) {
				console.div("[PUBG_API] [exportUser] No UserID submitted");
			} else {
				PUBG_api.getPlayers({ names: [$("#exportUserRAW-id").val()] }).then((res) => {
					console.log(res);
					if (res[0].id === undefined) {
						console.div("[PUBG_API] [exportUser] An error might have occurred, Check Console");
					} else {
						console.div("[PUBG_API] [exportUser] User Fetched Successfully");
						$("#exportUserRAW-download").click(() => {
							downloadString(`user-${md5(res.id)}.json`,JSON.stringify(res[0]));
						})
					}
				});
			}
		} catch(e) {
			console.div("[PUBG_API] [exportUser] An Error Occurred, Check Console");
			console.error(e);
		}
	})
}();
