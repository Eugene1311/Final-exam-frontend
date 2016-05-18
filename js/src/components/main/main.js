import React from 'react';
import classNames from 'classnames';
import request from '../../helpers/request';
import config from '../../config/config';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isDropped: false,
      isError: false,
      data: this.props.data || {},
      login: '',
      firstName: '',
      lastName: '',
      password: ''
    };

    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onShowForm = this.onShowForm.bind(this);
  }
  componentDidMount() {
    window.addEventListener('showForm', this.onShowForm, false);
    window.addEventListener('changeLanguage', this.onChangeLanguage, false);
  }
  componentWillUnmount() {
    window.removeEventListener('showForm', this.onShowForm, false);
    window.removeEventListener('changeLanguage', this.onChangeLanguage, false);
  }
  onShowForm() {
    this.setState({
      isHidden: false
    });
    // openSelect('.sign_form_input');
  }
  onChangeLanguage(e) {
    // console.log(this.state.isDropped, 'onChangeLanguage');
    this.setState({
      data: e.detail,
      isDropped: false
    });
  }
  getData(data) {
    this.setState({
      data: data
    });
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
      login: this.state.login.trim(),
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      password: this.state.password.trim(),
      role: this.refs.select.value
    };
    var that = this;

    request('POST', config.host + '/login', dataToSend, response => {
      console.log(JSON.parse(response));
      var response = JSON.parse(response);
      var route = response.role;

      if(response.loginReserved) {
        that.setState({
          isError: true
        });
        return;
      }

      if(route !== "no such role") {
        that.context.router.push("/" + route + "/profile");

        var event = new Event('userLogin');
        window.dispatchEvent(event);

        localStorage.login = response.login;
      }
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
    var errorClass = classNames({
      'sign_form_error': true,
      'sign_form_error-hidden': !this.state.isError
    });
    return (
      <div className="sign_form_wrapper">
        {!this.state.isHidden ? 
        <form className="sign_form" onSubmit={this.submitForm.bind(this)}>
          <i className="sign_form_close fa fa-times" aria-hidden="true" onClick={this.hideForm.bind(this)}></i>
          <label>{this.state.data.loginLabel}:
            <input type="text"
                name="login"
                className="sign_form_input" 
                value={this.state.login}
                onChange={this.handleChange.bind(this)}
                required />
          </label>
          <div className={errorClass}>{this.state.data.errorMessage}</div>
          <label>{this.state.data.firstNameLabel}:
            <input type="text"
                name="firstName"
                className="sign_form_input" 
                value={this.state.firstName} 
                pattern="\D{2,}"
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
              <option value="1">
                {this.state.data.developerRole}
              </option>
              <option value="2">
                {this.state.data.managerRole}
              </option>
              <option value="3">
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

Main.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Main;