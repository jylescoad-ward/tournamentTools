import _ from 'lodash';
import $ from 'jquery';

import "./customConsole.js";
import "./dropdown.js";
import "./processing/init.js";

console.debug(`[DocPathName] ${document.location.pathname}`);

global.downloadString = function(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

if (require("./../webpack.config.js").mode === "production") {
	setTimeout(function() {
		debugger;
	},50);
}

$(document).ready(() => {
    console.div(`[System] Page Ready!`);
})
