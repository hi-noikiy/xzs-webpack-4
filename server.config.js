module.exports = {
	port: 8888,
	hot: true,
	//热替换
	proxy: {
		'/api': {
			target: 'http://localhost:3000',
			pathRewrite: {
				'^/api': ''
			}
		}
	},
	inline: false,              //是否开启iframe
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