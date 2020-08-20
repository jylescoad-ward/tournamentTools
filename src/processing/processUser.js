module.exports = async function(nameGiven) {
	if (!PUBG_connectionWorking) return;
	try {
		return await PUBG_api.getPlayers({names: nameGiven});
	} catch(e) {
		console.div(`[PUBG_API] [processUser.js] An Error Occurred, Check Console.`);
		console.error(e);
	}
}
