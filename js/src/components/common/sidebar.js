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
    ReactDOM.findDOMNode(this).querySelector('.sidebar_menu_link').classList.add('sidebar_menu_link-active');
  	var that = this;
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
  changePage(event) {
    // event.preventDefault();
    var target = event.target;
    var menuItems = target.closest('.sidebar_menu').querySelectorAll('.sidebar_menu_link');

    Array.prototype.forEach.call(menuItems, item =>
      item.classList.remove('sidebar_menu_link-active')
    );
    target.classList.add('sidebar_menu_link-active');
  }
  render() {
  	var items = this.state.data;
  	var list = [];
  	var selectClass = classNames({
      'sidebar_menu_link': true,
      'sidebar_menu_link-active': this.state.isSelected
    });

  	for(let key in items) {
  		list.push(
        <li key={key}>
    			<Link to={"/" + this.props.root + "/" + key.toLowerCase()}
                className={selectClass}
                onClick={this.changePage.bind(this)}>
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