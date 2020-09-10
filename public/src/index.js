global.$ = require("jquery")
global.custLoader = require("./loader.js");
global.console.div = function(message) { var length = 6; var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; var retVal = ""; for (var i = 0, n = charset.length; i < length; ++i) { retVal += charset.charAt(Math.floor(Math.random() * n)); } console.log(message); custLoader.context(message.trim()); $(`<span id="out-${retVal}">${message}</span><br>`).hide().appendTo("#tourn-consoleout"); $(`#out-${retVal}`).fadeIn("fast"); delete(length,charset,retVal); };

// Runs when page is loaded.
$(document).ready(() => {
    console.div(`[System] Page Ready!`);
})

// Start loading required modules for torunamentTools to function
import "./misc.js";
import "./keyCheck.js";
import "./dropdown.js";
import "./buildInfo.js";
import "./proxyManager.js";
/*template
require("./.js");*/


// If set to production start anti-debugger stuff
$(document).ready(()=>{
	setTimeout(()=>{
		if (require("./../webpack.config.js").mode === "production") {
			setTimeout(function() {
				debugger;
			},500);
		}
	},5000)
})
