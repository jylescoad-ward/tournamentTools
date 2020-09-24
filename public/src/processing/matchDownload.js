var moment = require("moment");
var md5 = require("md5");
var $ = require("jquery");

var downloadSettings = {"telemetry": false};

function settingsParse(){
	downloadSettings.telemetry = $("#match_includeTelemetry").is(":checked");
}

window.match.download = function(result) {
	var dsFN_o = { "antiDupePrefix": randomString(16), "matchTime": moment(result.attributes.createdAt).unix(), "hash": md5("id-"+result.id+" t-"+moment(result.attributes.createdAt).unix()), };
	var downloadString_fileName = `match-${dsFN_o.antiDupePrefix}-${dsFN_o.matchTime}.json`;
	$("#processMatch-download").click(() => {
		settingsParse();

		downloadString(downloadString_fileName,JSON.stringify(result,null,"\t"));
		console.div("[exportMatch] Downloaded Match "+result.id);
	})
}
