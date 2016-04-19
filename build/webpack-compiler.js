import webpack from 'webpack';
import config from '../config';
import logger from 'debug';

const debug = logger( 'app:webpack-compile-production' );

let compiler = webpack( config.webpack );

compiler.run( function ( error, stats ) {
	if ( error ) {
		throw error;
	}
	if ( stats.compilation.warnings.length ) {
		debug( 'Warning' );
		debug( stats.compilation.warnings );
	}
	if ( stats.compilation.errors.length ) {
		debug( 'Error' );
		debug( stats.compilation.errors );
	}
	debug( 'Done compiling' );
} );
