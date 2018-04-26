module.exports = {
	port: 8888,
	hot: true,
	proxy: {
		'/api': {
			target: 'http://localhost:3000',
			pathRewrite: {
				'^/api': ''
			}
		}
	},
	inline: true,              //appear in the browser console
	progress: false,            //是否显示加载不步骤
	stats: {
		colors: true,
		modules: false,
		chunks: false,
		chunkModules: false,
		children: false
	},
	overlay: true
}