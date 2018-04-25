let webpackDevServer = require('webpack-dev-server'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config'),
	chalk = require('chalk'),
	compiler = webpack(webpackConfig, () => {
		console.log(chalk.red(`-------------------【编译完成】-------------------`));
	});
new webpackDevServer(compiler, {
	port: 8888,
	hot: true,               //热替换
	// proxy: {
	// 	'/api': {
	// 		target: 'http://localhost:3000',
	// 		pathRewrite: {'^/api': ''}
	// 	}
	// }
});