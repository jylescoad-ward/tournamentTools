import $ from "jquery";

$(document).ready(()=>{
	if (getCookie("proxyAddress").length < 1) {
		// No Proxy Address
		setCookie("proxyAddress","http://api.dxcdn.net/tournament");
	}

	if (getCookie("proxyAddress") == "default") {
		setCookie("proxyAddress","http://api.dxcdn.net/tournament");
	}
	$("#setting_currentProxyAddress").html(getCookie("proxyAddress"));
})

$("#setProxyAddress-submit").click(()=>{
	custLoader.show()
	var givenAPIInField = $("#setProxyAddress-input").val()
	if (validURL(givenAPIInField)) {
		// api address valid
		setCookie("proxyAddress",givenAPIInField);
		custLoader.context("[proxyManager] Proxy Address Changed, Please Refresh this page.");
	} else {
		// valid api address
		alert("Invalid URL");
	}
})
