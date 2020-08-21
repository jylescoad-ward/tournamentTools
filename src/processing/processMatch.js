module.exports = async function(matchID) {
	if (!PUBG_connectionWorking) return;

	console.div("[PUBG_API] [processMatch] Checking MatchID");
	const res = await PUBG_api.getMatch({ id: matchID })
	if (res.id !== matchID) {
		console.div("[PUBG_API] [processMatch] MatchID may be incorrect?");
		console.div("[PUBG_API] [processMatch] An error might have occured. Check console for more information.");
		return true;
	} else {
		console.div("[PUBG_API] [processMatch] MatchID Valid",res);
		return res;
	}
}
