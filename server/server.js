import Hapi from 'hapi';
import inert from 'inert';
import logger from 'debug';
import webpack from 'webpack';
import config from '../config';

/*
 * Intitalized debuggers
 */
let debug        = logger( 'app:hapi-server' );
let debugWebpack = logger( 'app:webpack' );
let debugError   = logger( 'app:webpack:error' );
let debugWarning = logger( 'app:webpack:warning' );

debug( 'Intializing server' );
const server     = new Hapi.Server();
const hapiConfig = config[ 'hapi-server' ];

debug( 'Selecting static server' );
server.connection( hapiConfig.static );
const staticServer = server.select( 'static' );

/*
 * This will watch the src folder when there are changes
 */
let compiler = webpack( config.webpack );

compiler.watch( {}, function ( error, stats ) {
	if ( error ) {
		throw error;
	}
	if ( stats.compilation.warnings.length ) {
		debugWarning( `Warning: found ${stats.compilation.warnings.length}` );
		for ( let i = 0; i < stats.compilation.warnings.length; ++i ) {
			let webpackWarning = stats.compilation.warnings[ i ];

			debugWarning( webpackWarning.name );
			debugWarning( webpackWarning.message );
		}
	}
	if ( stats.compilation.errors.length ) {
		debugError( `Error: found ${stats.compilation.errors.length}` );
		for ( let i = 0; i < stats.compilation.errors.length; ++i ) {
			let webpackError = stats.compilation.errors[ i ];

			debugError( webpackError.name );
			debugError( webpackError.message );
		}
	}
	debugWebpack( 'Compile webpack' );
} );

/*
 * Run static server
 */
server.register( [ inert ], function ( errorRegister ) {
	if ( errorRegister ) {
		return debug( `Something went wrong on registering packages: ${ errorRegister }` );
	}
	debug( 'Registered hapi plugins' );
	debug( 'Registering GET route for public routes on' );
	debug( hapiConfig.publicDirectory );
	staticServer.route( {
		'method'  : 'GET',
		'path'    : hapiConfig.publicDirectory.path,
		'handler' : {
			'directory' : {
				'path' : hapiConfig.publicDirectory.directory
			}
		}
	} );

	return server.start( function ( error ) {
		if ( error ) {
			return debug( `Something went wrong on start: ${ error }` );
		}
		return debug( `Server running at: ${ server.info.uri }` );
	} );
} );