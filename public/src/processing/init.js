/*
    == File Description ==
        + Decrept/Encrypt Token
        + Initialize PUBG API Connection
        + Function Handler
        + Error Handler
        + Console Output
*/

/* === Init PUBG API === */
import $ from "jquery";
setTimeout(async () => {
	if (getCookie("apiKey").length === 264) {
		var PUBG = require("battlegrounds-revisited");
		global.PUBG_api = new PUBG(getCookie("apiKey"));
		if (getCookie("keyValid") === "true") {
			console.log("[PUBG_API] [processing] Called User and Match Modules.");
			require("./user.js");
			require("./match.js");
		}
	}
},500)
