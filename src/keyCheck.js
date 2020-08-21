import $ from "jquery";
import pubgMod from "battlegrounds-revisited";
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjN2I4ODYwMC0zMmRkLTAxMzgtMmU3MC02MzE5NDU3ZGU0YzUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTgxODUyNjgxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Imp5bGVzY29hZHdhcmQtIn0.5mJeV8fZiZ_8MEdWK57l4JmlNWMaz2fIDnJVHAR7HFE
async function validateKey(butClik) {
	// If the button was not clicked and the api cookie does not exist
	if (!butClik && getCookie("apiKey").length === 0) {
		setCookie("keyValid","false");
		return 'noset';
	} else {
		var token = getCookie("apiKey");
		if (butClik) {
			token = $("#setAPIKEY-input").val()
		}
		var pubg = new pubgMod(token);
		const res = await pubg.getPlayers({names: ['xSuperSeed']})
		console.log("[PUBG_API] => [ConnectionTestResult]",res[0]);
		if (res[0].id !== undefined){
			setCookie("keyValid","true");
			setCookie("apiKey",$("#setAPIKEY-input").val());
	    	console.div("[PUBG_API] Connected to PUBG Servers.");
			global.PUBG_connectionWorking = true;
			return "valid";
		} else {
			setCookie("keyValid","false");
			global.PUBG_connectionWorking = false;
			return "invalid";
		}
	}
}

function checkKey(arg) {
	validateKey(arg).then((r) => {
		console.log("[keyCheck] Checking API Key...");
		if (!$("#keyCheckAlert").length) {
			$("#alerts").append(`<div id="keyCheckAlert"></div>`);
		}
		console.log(`[keyCheck] Key is ${r}`)
		switch(r) {
			case "noset":
			case "invalid":
				console.log(`[keyCheck] Key is ${r}`)
				var content = `
				<div id="keyCheckAlert">
					<div class="alert alert-danger" role="alert">
						API Key is invalid or not set.
					</div>
				</div>`;
				$("#keyCheckAlert").html(content);
				break;
			case "valid":
				console.log(`[keyCheck] Key is ${r}`)
				$("#keyCheckAlert").remove()
				$(".processing").fadeIn("fast");
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
