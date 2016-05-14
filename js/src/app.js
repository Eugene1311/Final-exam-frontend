import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Header from './components/header/header';
import Main from './components/main/main';
import request from './helpers/request';

request('GET', 'http://localhost:8080/init', null, response => {
	ReactDOM.render(
	  <Header data={JSON.parse(response)}/>,
	  document.querySelector('.header .container')
	);

	ReactDOM.render(
	  <Main data={JSON.parse(response)}/>,
	  document.querySelector('.main')
	);
	console.log(response);
});

// ReactDOM.render((
//   <Router history={browserHistory}>
//     <Route path="/" component={Header}>
//       <IndexRoute component={Header} />
//     </Route>
//   </Router>
// ), document.querySelector('.header .container'));