import { argv } from 'yargs';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import logger from 'debug';

let debug = logger( 'app:config' );

debug( 'Getting config' );
export default {
	'hapi-server' : {
		'static' : {
			'port'   : argv.port || 4500,
			'labels' : [ 'static' ]
		},
		'publicDirectory' : {
			'path'      : '/{param*}',
			'directory' : './dist'
		}
	},
	'webpack' : {

		'resolve' : {
			'root' : [
				path.resolve( 'src' ),
				path.resolve( 'node_modules' )
			],
			'extensions' : [ '', '.js', '.jsx', '.json' ]
		},

		'entry' : [
			'font-awesome-loader',
			'bootstrap-loader',
			'main.js'
		],

		'output' : {
			'path'     : './dist',
			'filename' : '[name].bundle.js'
		},

		'module' : {
			'preLoaders' : [],

			'loaders' : [
				{
					'test'    : /\.(js|jsx)$/,
					'exclude' : /node_modules/,
					'loader'  : 'babel',
					'query'   : {
						'presets' : [ 'es2015', 'react', 'stage-0' ]
					}
				},
				{
					'test'    : /\.css$/,
					'loaders' : [ 'style', 'css', 'postcss' ]
				},
				{
					'test'    : /\.scss$/,
					'loaders' : [ 'style', 'css', 'postcss', 'sass' ]
				},
				{
					'test'   : /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					'loader' : 'url?limit=10000'
				},
				{
					'test'   : /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
					'loader' : 'file'
				},
				{
					'test'   : /bootstrap-sass\/assets\/javascripts\//,
					'loader' : 'imports?jQuery=jquery'
				}
			]
		},

		'plugins' : [
			new HtmlWebpackPlugin( {
				'template' : './src/index.html',
				'filename' : 'index.html',
				'inject'   : 'body'
			} )
		]

	}
};