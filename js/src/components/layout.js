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
        request('GET', config.host + '/user-data', {}, (resp) => {
          console.log(JSON.parse(resp));
          var resp = JSON.parse(resp);
          if(resp.success) {
            var route = resp.role;
            var event = new CustomEvent('userLogin', {
              detail: resp
            });

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