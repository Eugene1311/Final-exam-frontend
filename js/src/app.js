import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Layout from './components/layout';
import Main from './components/main/main';
import request from './helpers/request';

request('GET', 'http://localhost:8080/init', null, response => {
	ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route path="/" component={Layout}>
	    	<IndexRoute component={Main} ></IndexRoute>
	    </Route>
	  </Router>
	), document.getElementById('app'));
	console.log(response);
});

