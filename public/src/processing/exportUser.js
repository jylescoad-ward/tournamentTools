var $ = require("jquery");
var md5 = require("md5");
var moment = require("moment");

module.exports = function() {
	if (!PUBG_connectionWorking) return;

	$("#exportUserRAW-submit").click(async () => {
		$("#exportUserRAW-download").hide();
		$("#exportUserRAW-view").hide();
		$("#view_data_currentlyViewing_short").html("Not Viewing Anything");
		try {
			var result = await require("./processUser.js")($("#exportUserRAW-id").val());
			if (result === true) {
				console.div("[PUBG_API] [exportMatch] An Error Occured.");
				return;
			} else {
				$("#exportUserRAW-download").fadeIn("fast");
				$("#exportUserRAW-view").fadeIn("fast");

				var downloadString_fileName = `user-${result[0].attributes.name}-${moment(new Date()).unix()}.json`;
				console.div("[PUBG_API] [exportUser] User Ready to Download");
				$("#exportUserRAW-view").click(()=>{
					$("#view_data_currentlyViewing_short").html(`Ready to view ${result[0].attributes.name}`);
				})
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
