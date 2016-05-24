import React from 'react';
import request from '../../helpers/request';
import config from '../../config/config';

class SignButtons extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
    	isLogin: false
    };
  }
  componentDidMount() {
  	var that = this;
  	window.addEventListener('userLogin', () => {
  		that.setState({
  			isLogin: true
  		});
  	});
  }
	showForm(event) {
		event.preventDefault();
		var target = event.target;
		var isSignIn;
		
		if(target.classList.contains('sign_button-sighin')) {
			isSignIn = true;
		} else {
			isSignIn = false;
		}
		
		let newEvent = new CustomEvent('showForm', {
			detail: {
				isSignIn: isSignIn
			} 
		});
		window.dispatchEvent(newEvent);
	}
	signOut(event) {
		event.preventDefault();

		request('GET', config.host + '/logout', {}, (resp) => {
			this.context.router.push("/");
			this.setState({
				isLogin: false
			});
			localStorage.removeItem('login');
			localStorage.removeItem('userData');
		});
	}
  render() {
    return (
			<div className="sign_buttons">
				{!this.state.isLogin ?
					<div>
						<a href="#"
							className="header_button sign_button sign_button-sighin"
							onClick={this.showForm}>
							{this.props.signIn}
						</a>
						<a href="#"
							className="header_button sign_button sign_button-sighup"
							onClick={this.showForm}>
							{this.props.signUp}
						</a> 
					</div> :
					<div>
						<a href="#"
							className="header_button sign_button sign_button-sighin"
							onClick={this.signOut.bind(this)}>
							{this.props.signOut}
						</a>
					</div>
				}
			</div>
    );
  }
};

SignButtons.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignButtons;