import React from 'react';
import Header from './header/header';
import request from '../helpers/request';
import config from '../config/config';
import Profile from './common/profile';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log(React.Children.only(Profile));
    var that = this;
    var login = localStorage.getItem('login');

    var promise = new Promise((resolve, reject) => {
      request('GET', config.host + '/init', null, response => {
        resolve(response);
      });
    });
    
    promise
    .then(response => {
      var data = JSON.parse(response);
      that.refs.header.getData(data);
      //todo это же событие создаётся в header - разобраться
      var event = new CustomEvent('changeLanguage', {
        detail: data
      });

      window.dispatchEvent(event);
    })
    .then(() => {
      
      if(login) {
        request('GET', config.host + '/user-data', {}, (response) => {
          // console.log(JSON.parse(response), 'layout');
          var response = JSON.parse(response);
          if(response.success) {
            var route = response.role;
            var event = new Event('userLogin');
            var userData = JSON.stringify({
                login: response.login,
                first_name: response.first_name,
                last_name: response.last_name
              });

            localStorage.userData = userData;

            that.context.router.push("/" + route + "/profile");
            window.dispatchEvent(event);
          }
        });
      }      
    });
  }
  render() {
    return (
      <div className="layout">
        <header className="header">
          <div className="container">
            <Header ref="header" />
          </div>
        </header>
        <main className="main">
          {this.props.children}
        </main>
        <footer className="footer"></footer>
      </div>
    )
  }
};

Layout.contextTypes = {
  router: React.PropTypes.object.isRequired
};