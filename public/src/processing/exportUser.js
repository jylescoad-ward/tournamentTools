var $ = require("jquery");
var md5 = require("md5");
var moment = require("moment");

module.exports = function() {
	if (!PUBG_connectionWorking) return;

	$("#exportUserRAW-submit").click(async () => {
		try {
			var result = await require("./processUser.js")($("#exportUserRAW-id").val());
			if (result === true) {
				console.div("[PUBG_API] [exportMatch] An Error Occured.");
				return;
			} else {
				$("#exportUserRAW-download").show();
				$("#exportUserRAW-view").show();

				var downloadString_fileName = `user-${result[0].attributes.name}-${moment(new Date()).unix()}.json`;
				console.div("[PUBG_API] [exportUser] User Ready to Download");
				$("#exportUserRAW-download").click(() => {
					var protectedFile = result[0];
					delete(protectedFile._api);
					protectedFile = JSON.stringify(protectedFile,null,"\t");
					downloadString(downloadString_fileName,protectedFile);
					console.div("[PUBG_API] [exportUser] Downloaded User "+result[0].attributes.name);
				})
			}
		} catch(e) {
			console.div("[PUBG_API] [exportUser] An Error Occurred, Check Console");
			console.error(e);
		}
	})
}();
