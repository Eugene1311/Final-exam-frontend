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
        tasks: 'Список ТЗ'
      } :
      {
        profile: 'Profile',
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
        tasks: e.detail.tasksList
      }
    });
    var event = new CustomEvent('changeMenu', {
      detail: this.state.menu
    });

    window.dispatchEvent(event);
  }
  showTasks() {
    request('GET', config.host + '/api/tasks', {}, resp => {
      console.log(JSON.parse(resp));
    });
  }
  render() {
    return (
      <div className="container">
        <Sidebar data={this.state.menu} root="developer" handler={this.showTasks.bind(this)}/>
        {this.props.children}
      </div>
    )
  }
};