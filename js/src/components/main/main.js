import React from 'react';
import classNames from 'classnames';
import request from '../../helpers/request';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isDropped: false,
      data: this.props.data,
      firstName: '',
      lastName: '',
      password: ''
    };
  }
  componentDidMount() {
    var that = this;
    window.addEventListener('showForm', () => {
      that.setState({
        isHidden: false
      });
    }, false);
    window.addEventListener('changeLanguage', (e) => {
      console.log(this.state.isDropped);
      that.setState({
        data: e.detail,
        isDropped: false
      });
    }, false);
    // openSelect('.sign_form_input');
  }
  hideForm() {
    this.setState({
      isHidden: true
    });
  }
  toggleSelect() {
    this.setState({
      isDropped: !this.state.isDropped
    });
  }
  submitForm(e) {
    e.preventDefault();

    var dataToSend = {
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      password: this.state.password.trim(),
      role: this.refs.select.value
    };
    console.log(dataToSend);
    request('POST', 'http://localhost:8080/login', dataToSend, response => {
      console.log(JSON.parse(response));
    });
  }
  handleChange(e) {
    this.setState({
      [`${e.target.getAttribute("name")}`]: e.target.value
    });
  }
  render() {
    var selectClass = classNames({
      'sign_form_input sign_form_input-submit': true,
      'sign_form_input-dropped': this.state.isDropped
    });
    return (
      <div>
        {!this.state.isHidden ? 
        <form className="sign_form" onSubmit={this.submitForm.bind(this)}>
          <i className="sign_form_close fa fa-times" aria-hidden="true" onClick={this.hideForm.bind(this)}></i>
          <label>{this.state.data.firstNameLabel}:
            <input type="text"
                name="firstName"
                className="sign_form_input" 
                value={this.state.firstName} 
                pattern="\D{2}"
                onChange={this.handleChange.bind(this)}
                required />
          </label>
          <label>{this.state.data.lastNameLabel}:
            <input type="text"
                name="lastName"
                className="sign_form_input"
                value={this.state.lastName}
                onChange={this.handleChange.bind(this)}
                required />
          </label>
          <label>{this.state.data.passwordLabel}:
            <input type="password"
                name="password"
                className="sign_form_input"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
                required />
          </label>
          <label>{this.state.data.roleLabel}:
            <select ref="select" className="sign_form_input" onClick={this.toggleSelect.bind(this)} required>
              <option value="developer">
                {this.state.data.developerRole}
              </option>
              <option value="manager">
                {this.state.data.managerRole}
              </option>
              <option value="customer">
                {this.state.data.customerRole}
              </option>
            </select>
          </label>
          <input type="submit" value={this.state.data.submitButton} className={selectClass} />
        </form> : null }
      </div>
    );
  }
};