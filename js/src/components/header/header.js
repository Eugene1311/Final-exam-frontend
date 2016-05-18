import React from 'react';
import Languages from './languages';
import Logo from './logo';
import SignButtons from './signButtons';
import request from '../../helpers/request';
import config from '../../config/config';

export default class Header extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
    	data: {}
    };

    this.requestLanguage = this.requestLanguage.bind(this);
	}
  getData(data) {
    this.setState({
      data: data
    });

    this.refs.language.setLanguage(data.language);
  }
	requestLanguage(event) {
    event.preventDefault();
    var language = event.target.dataset.lang,
        target = event.target,
		that = this;

    request('GET', config.host + '/localize?language=' + language, null, function(response) {
      // console.log(JSON.parse(response));
      var data = JSON.parse(response);
      var event = new CustomEvent('changeLanguage', {
        detail: data
      });

      window.dispatchEvent(event);

      localStorage.language = language;

      that.setState({data: data});
      Array.prototype.forEach.call(target.parentNode.childNodes, function(item) {
          item.classList.remove('languages-selected');
      });
      target.classList.add('languages-selected');
    });
  }
  render() {
    return (
    	<div>
  			<Logo title={this.state.data.title}/>
  			<Languages requestLanguage={this.requestLanguage} ref="language" language={this.state.data.language}/>
  			<SignButtons 
          signIn={this.state.data.signInButton}
          signUp={this.state.data.signUpButton}
          signOut={this.state.data.signOutButton}/>
  		</div>
    );
  }
};