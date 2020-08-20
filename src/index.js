import _ from 'lodash';
import $ from 'jquery';

import "./customConsole.js";
import "./dropdown.js";
import "./processing/init.js";

console.debug(`[DocPathName] ${document.location.pathname}`);

if (require("./../webpack.config.js").mode === "production") {
	setTimeout(function() {
		debugger;
	},50);
}

$(document).ready(() => {
    console.div(`[System] Page Ready!`);
})
