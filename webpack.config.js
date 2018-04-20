const path = require('path');
let devServerConfig = require('./server.config'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	DashboardPlugin = require('webpack-dashboard/plugin');
let distPath = path.resolve(__dirname, 'dist'),
	srcPath = path.resolve(__dirname, 'app');
module.exports = {
	mode: 'development',
	// devtool: 'cheap-source-map',
	entry: {
		a: [path.resolve(srcPath, 'a')]
	},
	output: {
		auxiliaryComment: 'Test Comment',       //
		path: distPath,
		filename: 'js/[id].common.js',
		chunkFilename: 'js/[id].chunk.js',
		publicPath: '', // string
		library: 'MyLibrary', // string,s
		libraryTarget: 'umd', // universal module definition
	},
	resolve: {
		alias: {
			'@': srcPath,
		}
	},
	module: {
		noParse: /lodash/,
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, 'app'),
				loader: 'babel-loader',
				query: {compact: false}     // do not use in product env!
			},
			// {
			// 	test: /\.css$/,
			// 	loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			// },
			// {
			// 	test: /\.less$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: 'style-loader',
			// 		use: [
			// 			{
			// 				loader: 'css-loader',
			// 				options: {
			// 					modules: true,
			// 					importLoaders: 1,
			// 					localIdentName: '[name]__[local]___[hash:base64:5]'
			// 				}
			// 			}, {
			// 				loader: 'less-loader',
			// 				options: {
			// 					strictMath: true,
			// 					noIeCompat: true
			// 				}
			// 			}
			// 		]
			// 	})
			// },
			{
				test: /\.(ttf|otf|eot|woff|woff2|svg)$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 		drop_console: false,
		// 	}
		// }),
		// new ExtractTextPlugin({
		// 	filename: 'build.min.css',
		// 	allChunks: true,
		// }),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.DefinePlugin({
			// 'process.env.NODE_ENV': '"production"',
		}),
		new webpack.optimize.SplitChunksPlugin({
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		})
		// webpack-dev-server enhancement plugins
		// new DashboardPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
	]
}

