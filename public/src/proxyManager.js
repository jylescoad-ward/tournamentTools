import $ from "jquery";

$(document).ready(()=>{
	if (localStorage.proxyAddress === undefined) {
		// No Proxy Address
		localStorage.proxyAddress = "http://api.dxcdn.net/tournament";
	}

	if (localStorage.proxyAddress == "default") {
	localStorage.proxyAddress = "http://api.dxcdn.net/tournament";
	}
	$("#setting_currentProxyAddress").html(localStorage.proxyAddress);
})

$("#setProxyAddress-submit").click(()=>{
	custLoader.show()
	var givenAPIInField = $("#setProxyAddress-input").val()
	if (validURL(givenAPIInField)) {
		// api address valid
		localStorage.proxyAddress = givenAPIInField
		custLoader.context("[proxyManager] Proxy Address Changed, Please Refresh this page.");
	} else {
		// valid api address
		alert("Invalid URL");
	}
})
