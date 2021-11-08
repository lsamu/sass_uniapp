const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
const UglifyJsPlugin=require("uglifyjs-webpack-plugin")

module.exports = {
	runtimeCompiler: true,
	// configureWebpack: config => {
	// 	config.plugins = [
	// 		new webpack.DefinePlugin({
	// 			ROUTES: webpack.DefinePlugin.runtimeValue(() => {
	// 				const tfPages = new TransformPages({
	// 					includes: ['path', 'name', 'aliasPath']
	// 				});
	// 				return JSON.stringify(tfPages.routes)
	// 			}, true)
	// 		})
	// 	]
	// 	if (process.env.NODE_ENV!="development") {
	// 		config.plugins.push(
	// 			new UglifyJsPlugin({
	// 				uglifyOptions: {
	// 					compress: {
	// 						warnings: false,
	// 						drop_debugger: true,
	// 						drop_console: true,
	// 					},
	// 				},
	// 				sourceMap: false,
	// 				parallel: true,
	// 			})
	// 		)
	// 	}
	// },
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		],
		// resolve:{
		// 	alias:{
		// 		"@":"./src"
		// 	}
		// }
	},
	// transpileDependencies: ['@dcloudio/uni-ui']
}