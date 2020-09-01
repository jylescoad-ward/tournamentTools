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

			//Tell the user that they connected to the PUBG_API
			//		without any errors (yet) and set a variable
			//		which will help "kickstart" all of the functions.
	    	console.div("[PUBG_API] Connected to PUBG Servers.");
			global.PUBG_connectionWorking = true;

			//Set misc things for the user
			$("#settings_currentAPIKEY").html(getCookie("apiKey"));

			//Start API Processors and show the elements that
			//		require the PUBG api to function. (elements
			//		with the requireAPIKey class). This will also
			//		hide the loading overlay (might remove it
			//		later in development).
			require("./processing/init.js");
			$(".requireAPIKey").fadeIn("fast");
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

	//Show loader to restrict user from interrupting.
	custLoader.show();
	console.div("[keyCheck] Checking API Key...");
	validateKey(arg).then((r) => {
		if (!$("#keyCheckAlert").length) {
			$("#loading").children("span.context").html("Nothing")
			$("#alerts").append(`<div id="keyCheckAlert"></div>`);
		}
		console.div(`[keyCheck] Key is ${r}`)
		switch(r) {
			case "noset":
			case "invalid":

				// Tell user that the key is invalid or undefined.
				var content = `
				<div id="keyCheckAlert">
					<div class="alert alert-danger" role="alert">
						API Key is invalid or does not exist.
					</div>
				</div>`;
				$(".settings").children(".panel").children(".panel-body").fadeIn("fast");
				$("#keyCheckAlert").html(content);
				break;
			case "valid":

				//Fadeout the key check alert just in case if it was shown before.
				$("#keyCheckAlert").fadeOut("fast");
				$("#keyCheckAlert").html(" ")

				//Start API Processor.
				require("./processing/init.js");
				break;
			default:

				// If something screwed up retry.
				checkKey(arg);
				break;
		}
		custLoader.hide();
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
