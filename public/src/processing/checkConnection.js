module.exports = async function() {
	try {
		const res = await PUBG_api.getPlayers({names: ['xSuperSeed']});
		/*res.forEach(async(m) => {
			delete(m._api.apikey)
		})*/
		console.log("[PUBG_API] => [ConnectionTestResult]",res[0]);
		if (res[0].id !== undefined){
	    	console.div("[PUBG_API] Connected to PUBG Servers.");
		}
		delete(res);
	    global.PUBG_connectionWorking = true;
		return true;
	} catch (e) {
	    console.error(e);
	    console.div("[PUBG_API] Error Occurred, Check Console.");
	    global.PUBG_connectionWorking = false;
		return false;
	}
}();
