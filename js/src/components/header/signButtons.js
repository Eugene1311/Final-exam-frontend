'use strict';
import React from 'react';

var SignButtons = React.createClass({
	showForm: function(event) {
		event.preventDefault();
		var target = event.target;
		
		if(target.classList.contains('sign_button-sighin')) {
			let event = new Event('showForm');
			window.dispatchEvent(event);
		}
	},
  render: function() {
    return (
		<div className="sign_buttons" onClick={this.showForm}>
			<a href="#" className="header_button sign_button sign_button-sighin">
				{this.props.signIn}
			</a>
			<a href="#" className="header_button sign_button sign_button-sighup">
				{this.props.signUp}
			</a>
		</div>
    );
  }
});

export default SignButtons;