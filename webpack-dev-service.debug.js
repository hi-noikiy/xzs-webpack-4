let webpackDevServer = require('webpack-dev-server'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack-dev-service'),
	serverConfig = require('./server.config'),
	chalk = require('chalk');
compiler = webpack(webpackConfig, () => {
	// console.log(chalk.red(`-------------------【编译完成】-------------------`));
	debug(`-------------------【编译完成】-------------------`);
});
new webpackDevServer(compiler, serverConfig);