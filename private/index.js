// Rewrite

//

try {
	var http = require('http'),
		httpProxy = require('http-proxy');
	var proxy = httpProxy.createProxyServer({});
	var server = http.createServer(function(req, res) {
		proxy.web(req, res, {
			target: 'https://api.playbattlegrounds.com:443',
			origin: 'http://tournament.jyles.club',
			selfHandleResponse : true,
			//target: "http://tournament.jyles.club:80",
			followRedirects: true,
			secure: true,
			changeOrigin: true,
			agent: ""
		});
		proxy.on('proxyReq', function(proxyReq, req, res, options) {
			proxyReq.setHeader('Authorization', `Bearer ${require("./keys.json")[0]}`);
			proxyReq.setHeader('Accept', 'application/vnd.api+json');
			proxyReq.setHeader('Access-Control-Allow-Origin', '*')
		});

		proxy.on('proxyRes', function(proxyRes, req, res) {
			console.log('RAW Response from the target', JSON.stringify(req.headers, true, 2));
			var body = [];
			proxyRes.on('data',function (chunk) {
				body.push(chunk);
				console.log(chunk)
			});
			proxyRes.on('end', function () {
				body = Buffer.concat(body).toString();
				console.log("res header from proxy server", proxyRes.headers);
				console.log("res from proxied server:", body);
				res.writeHead(200, proxyRes.headers);
				res.end(body);
			});
		})
	});
	console.log("listening on port 7793")
	server.listen(7793);
} catch (e){
	console.error(e);
}
