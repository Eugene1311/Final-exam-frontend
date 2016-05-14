import React from 'react';

var logo = React.createClass({
  render: function() {
    return (
		<div className="logo">
			<a href="/" className="logo_link">{this.props.title}</a>
		</div>
    );
  }
});

export default logo;