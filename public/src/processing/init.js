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
$(document).ready(()=>{
	setTimeout(async () => {
		if (localStorage.APIKey !== undefined) {
			var PUBG = require("battlegrounds-revisited");
			var settings = {
				key: localStorage.APIKey,
				platform: 'steam',
				proxy: localStorage.proxyAddress
			};
			setTimeout(()=>{
				global.PUBG_api = new PUBG(settings);
				if (localStorage.keyValid == "true") {
					console.log("[PUBG_API] [processing] Called User and Match Modules.");
					require("./user.js");
					require("./match.js");
				}
			},500)
		}
	},500)
})
