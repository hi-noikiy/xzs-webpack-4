let webpack = require('webpack'),
	webpackConfig = require('./webpack.config'),
	chalk = require('chalk');

webpack(webpackConfig, ()=>{
	console.log(chalk.red(`-------------------【编译完成】-------------------`));
})
