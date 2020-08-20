/*
    == File Description ==
        + Decrept/Encrypt Token
        + Initialize PUBG API Connection
        + Function Handler
        + Error Handler
        + Console Output
*/

/* === Init PUBG API === */
import $ from "jquery";
$(document).ready(async () => {
	var APIKEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjN2I4ODYwMC0zMmRkLTAxMzgtMmU3MC02MzE5NDU3ZGU0YzUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTgxODUyNjgxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Imp5bGVzY29hZHdhcmQtIn0.5mJeV8fZiZ_8MEdWK57l4JmlNWMaz2fIDnJVHAR7HFE";

	var PUBG = require("./battlegrounds/index.js");
	global.PUBG_api = new PUBG(APIKEY);

	require("./checkConnection.js");
	require("./user.js");
	require("./match.js");
})
