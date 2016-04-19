import config from './config';
import apiHandler from './common/api-handler';

function loggedIn () {
	let token = localStorage.getItem( 'token' );

	if ( token ) {
		return true;
	}

	return false;
}

function requireAuth ( nextState, replace ) {
	if ( !loggedIn() ) {
		replace( {
			'pathname' : '/login',
			'state'    : {
				'nextPathname' : nextState.location.pathname
			}
		} );
	}
}


export default {
	requireAuth
};
