module.exports = {
	'/root/': {
		target: 'http://114.55.72.164:8091/',
		changeOrigin: true
	},
	"/api": {
		target: "http://115.159.121.62:7111",
		changeOrigin: true,
		// ws: true,//websocket支持
		secure: false,
		
	},

}