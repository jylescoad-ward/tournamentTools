async function testConnection(PUBG_api) {
    try {
		const res = await PUBG_api.getPlayers({names: ['xSuperSeed']});
		res.forEach(async(m) => {
			delete(m._api.apikey)
		})
		console.log("[PUBG_API] => [ConnectionTestResult]",res[0]);
		if (res[0].id !== undefined){
        	console.div("[PUBG_API] Connected to PUBG Servers.");
		}
		delete(res);
        return true;
    } catch (e) {
        console.error(e);
        console.div("[PUBG_API] Error Occurred, Check Console.");
        return false;
    }
}

global.PUBG_connectionWorking = testConnection(PUBG_api);
