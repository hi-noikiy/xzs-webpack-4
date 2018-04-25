const path = require('path');
let devServerConfig = require('./server.config'),
	chalk = require('chalk');
webpack = require('webpack'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	DashboardPlugin = require('webpack-dashboard/plugin');
let distPath = path.resolve(__dirname, 'dist'),
	srcPath = path.resolve(__dirname, 'app');
module.exports = {
	mode: 'development',    //production or  development or
	devtool: 'cheap-source-map',
	entry: {
		app: [path.resolve(srcPath, 'index')]
	},
	output: {
		auxiliaryComment: 'Test Comment',       //
		path: distPath,
		filename: 'js/[name].common.js',
		chunkFilename: 'js/[name].chunk.js',
		publicPath: '', // string
		library: 'MyLibrary', // string,s
		// libraryTarget: 'umd', // universal module definition
	},
	resolve: {
		alias: {
			'@': srcPath,
		}
	},
	module: {
		// noParse: /lodash/,
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, 'app'),
				loader: 'babel-loader',
				query: {compact: false}     // do not use in product env!
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]__[local]___[hash:base64:5]'
							}
						}, {
							loader: 'less-loader',
							options: {
								strictMath: true,
								noIeCompat: true
							}
						}
					]
				})
			},
			{
				test: /\.(ttf|otf|eot|woff|woff2|svg)$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		// new CleanWebpackPlugin([distPath]),
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			allChunks: true
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.DefinePlugin({
			// 'process.env.NODE_ENV': '"production"',
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			title: 'Custom template using Handlebars',
			template: path.resolve(srcPath, 'index.html'),
			chunks: ['app', 'commons']
		}),
		new webpack.HotModuleReplacementPlugin()
		// new webpack.optimize.SplitChunksPlugin({
		// cacheGroups: {
		// 	vendors: {
		// 		test: /[\\/]node_modules[\\/]/,
		// 		name: 'vendors',
		// 		chunks: 'all'
		// 	}
		// }
		// })
		// webpack-dev-server enhancement plugins
		// new DashboardPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		port: 8888,
		hot: true,               //热替换
		proxy: {
			'/api': {
				target: "http://localhost:3000",
				pathRewrite: {"^/api" : ""}
			}
		},
		stats: {
			colors: true,
			modules: false,
			chunks: false,
			chunkModules: false,
			children: false
		},
		overlay: true
	}
}