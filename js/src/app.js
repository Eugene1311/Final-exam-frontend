import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Layout from './components/layout';
import Main from './components/main/main';
import Customer from './components/customer/main';
import Developer from './components/developer/main';
import Manager from './components/manager/main';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
    	<IndexRoute component={Main} ></IndexRoute>
    	<Route path="customer" component={Customer}></Route>
    	<Route path="developer" component={Developer}></Route>
    	<Route path="manager" component={Manager}></Route>
    </Route>
  </Router>
), document.getElementById('app'));