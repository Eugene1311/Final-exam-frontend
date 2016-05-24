import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	data: this.props.data
    };

    this.onChangeMenu = this.onChangeMenu.bind(this);
  }
  componentDidMount() {
    window.addEventListener('changeMenu', this.onChangeMenu, false);
  }
  componentWillUnmount() {
    window.removeEventListener('changeMenu', this.onChangeMenu, false);
  }
  onChangeMenu(e) {
    this.setState({
      data: e.detail
    });
  }
  render() {
  	var items = this.state.data;
  	var list = [];

  	for(let key in items) {
  		list.push(
        <li key={key} data-key={key}>
    			<Link to={"/" + this.props.root + "/" + key.toLowerCase()}
                className="sidebar_menu_link"
                activeClassName="sidebar_menu_link-active">
  		      {items[key]}
  		    </Link>
        </li>
			);
  	}
  	return (
  		<sidebar className="sidebar">
        <ul className="sidebar_menu">
        	{list}
        </ul>
      </sidebar>
    )
  }
};