import $ from "jquery";

if (window.localStorage.developerMode !== undefined) {
	if (typeof window.localStorage.developerMode === "boolean") {
		console.div(`[settingManager] developerMode detected as ${window.localStorage.developerMode}`)
		$("#enableDeveloperMode").prop( "checked", window.localStorage.developerMode )
	}
} else {
	window.localStorage.developerMode = false;
	console.log("[settingManager] developerMode was not detected, so it has been set to false")
}

$("#enableDeveloperMode").click(()=>{
	var isChecked = $("#enableDeveloperMode").is(':checked');

	console.div(`[settingManager] developerMode set to ${isChecked}`)

	window.localStorage.developerMode = isChecked
})
