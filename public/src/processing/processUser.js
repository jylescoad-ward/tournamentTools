module.exports = async function(nameGiven) {
	if (!PUBG_connectionWorking) return;
	try {
		const data = await PUBG_api.getPlayers({names: nameGiven})
		data.forEach((p) => {
			console.div(`[PUBG_API] [processUser] Processed User "${p.attributes.name}"`)
		})
		return data;
	} catch(e) {
		console.div(`[PUBG_API] [processUser] An Error Occurred, Check Console.`);
		console.error(e);
	}
}
