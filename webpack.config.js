const path = require('path');
let devServerConfig = require('./server.config');
module.exports = {
	mode: '·production',
	devtool: 'cheap-source-map',
	entry: {
		a: ['./a']
	},
	output: {
		auxiliaryComment: 'Test Comment',       //
		path: path.resolve(__dirname, 'dist'),  //
		filename: 'bundle.js', // string
		// the filename template for entry chunks
		publicPath: '/assets/', // string
		// the url to the output directory resolved relative to the HTML page
		library: 'MyLibrary', // string,
		libraryTarget: 'umd', // universal module definition
	},
	module: {
		noParse: /lodash/,
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: srcPath,
				loader: 'babel-loader',
				query: {compact: false}     // do not use in product env!
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
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
	}
}

