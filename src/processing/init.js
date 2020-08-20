/*
    == File Description ==
        + Decrept Token
        + Initialize PUBG API Connection
        + Function Handler
        + Error Handler
        + Console Output
*/

var PUBG = require("battlegrounds");


const api = new PUBG("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjN2I4ODYwMC0zMmRkLTAxMzgtMmU3MC02MzE5NDU3ZGU0YzUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTgxODUyNjgxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Imp5bGVzY29hZHdhcmQtIn0.5mJeV8fZiZ_8MEdWK57l4JmlNWMaz2fIDnJVHAR7HFE")
async function testConnection() {
    try {
        const res = await api.getPlayers({ names: ['xSuperSeed'] });
        console.div("[PUBG_API] Connected to PUBG Servers.");
        return true;
    } catch (e) {
        console.error(e);
        console.div("[PUBG_API] Error Occurred, Check Console.");
        return false;
    }
}

testConnection();
