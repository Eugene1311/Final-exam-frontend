import React from 'react';
import Sidebar from '../common/sidebar';
import Profile from '../common/profile';
import request from '../../helpers/request';
import config from '../../config/config';

export default class Customer extends React.Component {
  constructor(props) {
    super(props);

    var language = localStorage.getItem('language');
    var menu = language === 'ru' ?
      {
        profile: 'Профиль',
        newTask: 'Составить ТЗ',
        tasks: 'Список ТЗ'
      } :
      {
        profile: 'Profile',
        newTask: 'Create new task',
        tasks: 'Tasks list'
      };
    this.state = {
      menu: menu
    };

    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }
  componentDidMount() {
    window.addEventListener('changeLanguage', this.onChangeLanguage, false);  
  }
  componentWillUnmount() {
    window.removeEventListener('changeLanguage', this.onChangeLanguage, false); 
  }
  onChangeLanguage(e) {
    this.setState({
      menu: {
        profile: e.detail.profile,
        newTask: e.detail.newTask,
        tasks: e.detail.tasksList
      }
    });
    var event = new CustomEvent('changeMenu', {
      detail: this.state.menu
    });

    window.dispatchEvent(event);
  }
  render() {
    return (
      <div className="container">
        <Sidebar data={this.state.menu} root="customer"/>
        {this.props.children}
      </div>
    )
  }
  getChildContext() {
    return {path: "/customer"};
  }
};

Customer.childContextTypes = {
  path: React.PropTypes.string
}