import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Layout from './components/layout';
import Main from './components/main/main';
import Customer from './components/customer/main';
import TasksList from './components/common/tasksList';
import Task from './components/common/task';
import NewTask from './components/customer/newTask';
import Profile from './components/common/profile';
import Developer from './components/developer/main';
import DeveloperTaskList from './components/developer/tasksList';
import Manager from './components/manager/main';
import CustomersList from './components/manager/customersList';
import DevelopersList from './components/manager/developersList';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
    	<IndexRoute component={Main} ></IndexRoute>
    	<Route path="customer" component={Customer}>
    		<Route path="profile" component={Profile} ></Route>
            <Route path="newtask" component={NewTask} ></Route>
            <Route path="tasks" component={TasksList} ref="taskslist"></Route>
    	</Route>
    	<Route path="developer" component={Developer} >
    		<Route path="profile" name="developer" component={Profile}></Route>
            <Route path="tasks" component={DeveloperTaskList} ></Route>
    	</Route>
    	<Route path="manager" component={Manager} >
    		<Route path="profile" component={Profile} ></Route>
            <Route path="customers" component={CustomersList} ></Route>
            <Route path="developers" component={DevelopersList} ></Route>
            <Route path="tasks" component={TasksList} ref="taskslist" showOpenButton="true"></Route>
            <Route path="tasks/:id" component={Task} ></Route>
    	</Route>
    </Route>
  </Router>
), document.getElementById('app'));