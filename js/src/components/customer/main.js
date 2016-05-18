import React from 'react';
import Sidebar from '../common/sidebar';
import Profile from '../common/profile';

export default class Customer extends React.Component {
  constructor(props) {
    super(props);

    var language = localStorage.getItem('language');
    var menu = language === 'ru' ?
      {
        profile: 'Профиль',
        newTask: 'Составить ТЗ',
        tasksList: 'Список ТЗ'
      } :
      {
        profile: 'Profile',
        newTask: 'Create new task',
        tasksList: 'Tasks list'
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
        tasksList: e.detail.tasksList
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
};