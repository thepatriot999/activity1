import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useRouterHistory, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createHashHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

/*
 * Needed to make the select field work
 */
injectTapEventPlugin();

/**
 * Include app scss
 */
import '!style!css!sass!./styles/app.scss';
import '!style!css!react-bootstrap-table/css/react-bootstrap-table-all.min.css';
import '!style!css!bootstrap-material-design/dist/css/bootstrap-material-design.css';
import '!style!css!bootstrap-material-design/dist/css/ripples.min.css';

/**
 * Auth checking
 */
import auth from './auth';

/**
 * Combine stores
 */
import store from './store';

/**
 * Get major components
 */
import Layout from './layout';
import Home from './modules/home/components';

/**
 * Initialize router
 */
const appHistory = useRouterHistory( createHistory )( { 'queryKey' : false } );

ReactDOM.render(
	<Provider store={store}>
		<Router history={appHistory}>
			<Route path="/" component={Layout}>
				<IndexRedirect to="users"/>
				<Route path="home" component={Home} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById( 'root' )
);
