import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import store from './store';

if(process.env.REACT_APP_ENABLE_REACT_HASH_ROUTER) {
	ReactDOM.render(
		<Provider store={store}>
			<HashRouter basename={process.env.REACT_APP_PUBLIC_URL}>
				<App />
			</HashRouter>
		</Provider>,
		document.getElementById('root')
	);
} else {
	ReactDOM.render(
		<Provider store={store}>
			<Router basename={process.env.REACT_APP_PUBLIC_URL}>
				<App />
			</Router>
		</Provider>,
		document.getElementById('root')
	);
}

