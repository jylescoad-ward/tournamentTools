import $ from "jquery";
import pubgMod from "battlegrounds-revisited";

async function validateKey(butClik) {

	// If the button was not clicked and the api cookie does not exist
	if (!butClik && getCookie("apiKey").length === 0) {
		setCookie("keyValid","false");
		return 'noset';
	} else {
		//token to check is fetched from the browsrs cookies.
		var token = getCookie("apiKey");
		if (butClik) {
			token = $("#setAPIKEY-input").val()
		}

		//Create PUBG API Instance and get request to check
		//		if the key is valid by retriving my usernames
		//		info.
		var pubg = new pubgMod(token);
		const res = await pubg.getPlayers({names: ['xSuperSeed']})

		//Print to console result (will print even if it is a fail)
		console.log("[PUBG_API] => [ConnectionTestResult]",res[0]);
		if (res[0].id !== undefined){
			//Print to console div and developer console that
			//		the key is valid and working.
			console.div("[keyCheck] Key Validated.")
			setCookie("keyValid","true");
			if (butClik) {
				setCookie("apiKey",$("#setAPIKEY-input").val());
			}
	    	console.div("[PUBG_API] Connected to PUBG Servers.");
			global.PUBG_connectionWorking = true;
			$("#settings_currentAPIKEY").html(getCookie("apiKey"));
			require("./processing/init.js");
			$("#loadingOverlay").fadeOut("fast");
			return "valid";
		} else {
			console.div("[keyCheck] Key Invalid")
			setCookie("keyValid","false");
			global.PUBG_connectionWorking = false;
			$("#loadingOverlay").fadeOut("fast");
			return "invalid";
		}
	}
}

function checkKey(arg) {
	validateKey(arg).then((r) => {
		console.div("[keyCheck] Checking API Key...");
		if (!$("#keyCheckAlert").length) {
			$("#alerts").append(`<div id="keyCheckAlert"></div>`);
		}
		console.div(`[keyCheck] Key is ${r}`)
		switch(r) {
			case "noset":
			case "invalid":
				var content = `
				<div id="keyCheckAlert">
					<div class="alert alert-danger" role="alert">
						API Key is invalid or does not exist.
					</div>
				</div>`;
				$("#keyCheckAlert").html(content);
				break;
			case "valid":
				$(".processing").fadeIn("fast");
				$("#keyCheckAlert").fadeOut("fast");
				$("#keyCheckAlert").html(" ")
				require("./processing/init.js");
				break;
			default:
				checkKey(arg);
				break;
		}
	})
}

$(document).ready(async () => {
	$(".processing").fadeOut("fast");
	checkKey(false);
	$("#setAPIKEY-submit").click(() => {
		console.log("[keyCheck] Key read from input",$("#setAPIKEY-input").val())
		checkKey(true)
	})
})
