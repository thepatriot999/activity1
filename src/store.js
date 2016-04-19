import { createStore, combineReducers, applyMiddleware } from 'redux';
import loginReducers from './modules/login/reducers';

/**
 * Make better loging
 */
const logger = store => next => action => {
	let result = next( action );

	return result;
};

const store = createStore(
	combineReducers( {
		loginReducers
	} ),
	applyMiddleware( logger )
);

export default store;
