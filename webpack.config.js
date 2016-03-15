module.exports = {
	entry: [
		//'webpack-dev-server/client?http://localhost:8080'
		, './main/app.js'
	]
	, module: {
		loaders: [
			{
				test: /\.js/
				, exclude: /node_modules/
				, loader: 'babel'
			}
			, {
				test: /\.css$/
				, exclude: /node_modules/
				, loader: 'style!css'
			}
			, {
				test: /\.html$/
				, loader: 'html'
			}
		]
	}
	, resolve: {
		extensions: ['', '.js']
	}
	, output: {
		path: __dirname + '/dist/src'
		, publicPath: '/'
		, filename: 'bundle.js'
	}
	, devServer: {
		contentBase: './dist'
	}
};