import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Layout from './components/layout';
import Main from './components/main/main';
import Customer from './components/customer/main';
import Profile from './components/common/profile';
import Developer from './components/developer/main';
import Manager from './components/manager/main';
import CustomerTaskList from './components/customer/tasksList';
import NewTask from './components/customer/newTask';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
    	<IndexRoute component={Main} ></IndexRoute>
    	<Route path="customer" component={Customer}>
    		<Route path="profile" component={Profile} ></Route>
            <Route path="taskslist" component={CustomerTaskList} ></Route>
            <Route path="newtask" component={NewTask} ></Route>
    	</Route>
    	<Route path="developer" component={Developer} >
    		<Route path="profile" component={Profile} ></Route>
            <Route path="taskslist" component={Profile} ></Route>
    	</Route>
    	<Route path="manager" component={Manager} >
    		<Route path="profile" component={Profile} ></Route>
            <Route path="taskslist" component={Profile} ></Route>
    	</Route>
    </Route>
  </Router>
), document.getElementById('app'));