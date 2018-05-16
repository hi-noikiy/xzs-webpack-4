const path = require('path'),
	chalk = require('chalk'),
	webpack = require('webpack'),
	// UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	// DashboardPlugin = require('webpack-dashboard/plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');
let distPath = path.resolve(__dirname, 'dist'),
	srcPath = path.resolve(__dirname, 'app');
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'development';
}
let env = process.env.NODE_ENV;
let mode = 'none',
	devtool = 'none',
	cssMinimize = false,   //css can minmize
	devServer = void 0,
	plugins = [
		new ExtractTextPlugin({
			filename: 'css/[name].[hash].css',
			allChunks: true
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.DefinePlugin({}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HashedModuleIdsPlugin(),                //每次没有变更的文件不会重新生成hash 节省资源
		new webpack.optimize.ModuleConcatenationPlugin(),   //提升hoist 提高浏览器编译速度
		new HtmlWebpackPlugin({
			inject: true,
			title: 'Custom template using Handlebars',
			template: path.resolve(srcPath, 'index.html'),
			chunks: ['app', 'commons', 'vendor'],
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		// new webpack.optimize.SplitChunksPlugin({
		// 	chunks: 'all',
		// 	minSize: 30000,
		// 	minChunks: 1,
		// 	maxAsyncRequests: 5,
		// 	maxInitialRequests: 3,
		// 	automaticNameDelimiter: '~',
		// 	name: true,
		// 	cacheGroups: {
		// 		vendors: {
		// 			// test: 'vendor',
		// 			// priority: -10,
		// 			// name: 'vendor',
		// 			// chunks: 'initial',
		// 			name: 'vendor',
		// 			test: 'vendor',
		// 			enforce: true
		// 		}
		// 	}
		// })
	]
if (env === 'development') {
	mode = 'development';
	devtool = 'cheap-source-map';
	devServer = require('./server.config');
	plugins.push(new webpack.HotModuleReplacementPlugin());
	// plugins.push(new webpack.NamedModulesPlugin());
} else {
	mode = 'production';
	cssMinimize = true;
	// plugins.push(new DashboardPlugin());
	plugins.unshift(new CleanWebpackPlugin([distPath]));
}
console.log(chalk.red(`====================== 当前开发环境:【${env}】 ======================`));
module.exports = {
	mode,
	devtool,
	entry: {
		app: [path.resolve(srcPath, 'index')],
		vendor: [
			'react',
			'react-css-modules',
			'react-dom',
			'react-redux',
			'react-router',
			'redux',
			'redux-thunk'
		]
	},
	output: {
		auxiliaryComment: 'Test Comment',       //
		path: distPath,
		filename: `js/[name].[${mode === 'production' ? 'chunkhash' : 'hash'}].js`,        //需要变更为 chunkHash
		chunkFilename: `js/[id].[${mode === 'production' ? 'chunkhash' : 'hash'}].chunk.js`,
		publicPath: '', // string
		library: 'MJ_Library', //可以soucrMap 库名
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
					fallback: {
						loader: 'style-loader',
						options: {
							minimize: cssMinimize
						}
					},
					use: {
						loader: 'css-loader',
						options: {
							minimize: cssMinimize
						}
					}
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: {
						loader: 'style-loader',
						options: {
							minimize: cssMinimize
						}
					},
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: cssMinimize,
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]__[local]___[hash:base64:5]'
							}
						}, {
							loader: 'less-loader',
							options: {
								minimize: cssMinimize,
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
	plugins,
	devServer,
	// optimization: {
	// 	// runtimeChunk: true,
	// 	// splitChunks: {
	// 	// 	cacheGroups: {
	// 	// 		vendor: {
	// 	// 			test: /[\\/]node_modules[\\/]/,
	// 	// 			name: 'vendor',
	// 	// 			enforce: true,
	// 	// 			chunks: 'all'
	// 	// 		}
	// 	// 	}
	// 	// },
	// 	minimize: true,
	// 	minimizer: [
	// 		new UglifyJsPlugin({
	// 			uglifyOptions: {
	// 				compress: {
	// 					drop_console: true,
	// 				}
	// 			}
	// 		})
	// 	]
	// }
}