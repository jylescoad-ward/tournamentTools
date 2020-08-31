var $ = require("jquery");
var md5 = require("md5");
var moment = require("moment");

module.exports = function() {
	if (!PUBG_connectionWorking) return;

	$("#processUser-submit").click(async () => {
		custLoader.show()
		custLoader.context("Parsing Fields")
		$("#processUser-download").hide();
		$("#processUser-view").hide();
		$("#view_data_currentlyViewing_short").html("Not Viewing Anything");
		try {
			var result = await require("./processUser.js")($("#processUser-id").val());
			if (result === true) {
				console.div("[PUBG_API] [exportMatch] An Error Occured.");
				custLoader.hide()
				return;
			} else {
				custLoader.context("Retrieved User from PUBG Servers")
				$("#processUser-download").fadeIn("fast");
				$("#processUser-view").fadeIn("fast");

				require("./UserToHTML.js")(result[0]);

				var downloadString_fileName = `user-${result[0].attributes.name}-${moment(new Date()).unix()}.json`;
				console.div("[PUBG_API] [exportUser] User Ready to Download");
				custLoader.context("Finished Processing User");
				$("#processUser-view").click(()=>{
					$("#view_data_currentlyViewing_short").html(`Ready to view ${result[0].attributes.name}`);
				})
				$("#processUser-download").click(() => {
					var protectedFile = result[0];
					delete(protectedFile._api);
					protectedFile = JSON.stringify(protectedFile,null,"\t");
					downloadString(downloadString_fileName,protectedFile);
					console.div("[PUBG_API] [exportUser] Downloaded User "+result[0].attributes.name);
				})
				custLoader.hide()
			}
		} catch(e) {
			console.div("[PUBG_API] [exportUser] An Error Occurred, Check Console");
			console.error(e);
		}
	})
}();
