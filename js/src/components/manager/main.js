import React from 'react';
import Sidebar from '../common/sidebar';
import Profile from '../common/profile';
import request from '../../helpers/request';
import config from '../../config/config';

export default class Manager extends React.Component {
  constructor(props) {
    super(props);

    var menu = localStorage.getItem('language') === 'ru' ?
      {
        profile: 'Профиль',
        customers: 'Заказчики',
        developers: 'Разработчики',
        tasks: 'Список ТЗ'
      } :
      {
        profile: 'Profile',
        customers: 'Сustomers',
        developers: 'Developers',
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
        customers: e.detail.customers,
        developers: e.detail.developers,
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
        <Sidebar
          data={this.state.menu} 
          root="manager"/>
        {this.props.children}
      </div>
    )
  }
  getChildContext() {
    return {showOpenButton: true};
  }
};

Manager.childContextTypes = {
  showOpenButton: React.PropTypes.bool
}