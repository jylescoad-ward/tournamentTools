import _ from 'lodash';
import $ from 'jquery';

import "./misc.js";
import "./keyCheck.js";
import "./customConsole.js";
import "./dropdown.js";
import "./buildInfo.js"

if (require("./../webpack.config.js").mode === "production") {
	setTimeout(function() {
		debugger;
	},50);
}

$(document).ready(() => {
    console.div(`[System] Page Ready!`);
})
