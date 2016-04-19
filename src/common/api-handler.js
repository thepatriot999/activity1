import superagent from 'superagent';
import config from '../config';

export default {
	'get' : function ( url ) {
		return new Promise( function ( resolve, reject ) {
			superagent
				.get( `${config.api}${url}` )
				.set( 'Accept', 'application/json' )
				.set( 'token', localStorage.getItem( config.tokenName ) )
				.end( ( error, result ) => {
					if ( error ) {
						if ( result && result.statusCode === 403 ) {
							localStorage.removeItem( config.tokenName );
							window.location = config.logoutPage;
						}
						return reject( error );
					}
					return resolve( result.body, result );
				} );
		} );
	},

	'post' : function ( url, body ) {
		return new Promise( function ( resolve, reject ) {
			superagent
				.post( `${config.api}${url}` )
				.set( 'Accept', 'application/json' )
				.set( 'token', localStorage.getItem( config.tokenName ) )
				.send( body )
				.end( ( error, result ) => {
					if ( error ) {
						if ( result && result.statusCode === 403 ) {
							localStorage.removeItem( config.tokenName );
							window.location = config.logoutPage;
						}
						return reject( {
							'error'  : error,
							'result' : result
						} );
					}
					return resolve( result.body, result );
				} );
		} );
	},

	'put' : function ( url, body ) {
		return new Promise( function ( resolve, reject ) {
			superagent
				.put( `${config.api}${url}` )
				.set( 'Accept', 'application/json' )
				.set( 'token', localStorage.getItem( config.tokenName ) )
				.send( body )
				.end( ( error, result ) => {
					if ( error ) {
						if ( result && result.statusCode === 403 ) {
							localStorage.removeItem( config.tokenName );
							window.location = config.logoutPage;
						}
						return reject( {
							'error'  : error,
							'result' : result
						} );
					}
					return resolve( result.body, result );
				} );
		} );
	},

	'del' : function ( url ) {
		return new Promise( function ( resolve, reject ) {
			superagent
				.del( `${config.api}${url}` )
				.set( 'Accept', 'application/json' )
				.set( 'token', localStorage.getItem( config.tokenName ) )
				.end( ( error, result ) => {
					if ( error ) {
						if ( result && result.statusCode === 403 ) {
							localStorage.removeItem( config.tokenName );
							window.location = config.logoutPage;
						}
						return reject( error );
					}
					return resolve( result.body, result );
				} );
		} );
	}
};
