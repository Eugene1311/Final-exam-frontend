import React from 'react';
import Header from './header/header';

export default class Layout extends React.Component {
	constructor(props) {
    super(props);
	}
	render() {
		return (
			<div className="layout">
				<header className="header">
			    <div className="container">
			    	<Header />
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