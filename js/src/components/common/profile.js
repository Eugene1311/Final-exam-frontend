import React from 'react';
import request from '../../helpers/request';
import config from '../../config/config';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    var language = localStorage.getItem('language');
    var data = language === 'ru' ?
      {
        login: 'Логин',
        firstName: 'Имя',
        lastName: 'Фамилия',
        editButton: 'Редактировать',
        saveButton: 'Сохранить',
        cancelButton: 'Отменить'
      } :
      {
        login: 'Login',
        firstName: 'First name',
        lastName: 'Last name',
        editButton: 'Edit',
        saveButton: 'Save',
        cancelButton: 'Cancel'
      };
    var userData = JSON.parse(localStorage.getItem('userData'));
    this.state = {
      data: data,
      login: userData.login,
      first_name: userData.first_name,
      last_name: userData.last_name,
      isEditing: false,
      qualification: 'junior',
      specialization: 'frontend developer'
    };

    this.onChangeLanguage = this.onChangeLanguage.bind(this);
  }
  componentDidMount() {
    window.addEventListener('changeLanguage', this.onChangeLanguage, false);
  }
  componentWillUnmount() {
    window.removeEventListener('changeLanguage', this.onChangeLanguage, false);
  }
  onChangeLanguage(e) {
    this.setState({
      data: {
        login: e.detail.login,
        firstName: e.detail.firstName,
        lastName: e.detail.lastName,
        editButton: e.detail.editButton,
        saveButton: e.detail.saveButton,
        cancelButton: e.detail.cancelButton
      }
    });
  }
  editProfile() {
    this.setState({
      isEditing: true,
      current_login: this.state.login,
      current_first_name: this.state.first_name,
      current_last_name: this.state.last_name     
    });
  }
  cancelEdit() {
    this.setState({
      isEditing: false,
      login: this.state.current_login,
      first_name: this.state.current_first_name,
      last_name: this.state.current_last_name  
    });
  }
  saveNewData() {
    var dataToSend = {
      current_login: this.state.current_login,
      new_login: this.state.login,
      new_first_name: this.state.first_name,
      new_last_name: this.state.last_name     
    };

    if(this.props.route.name === 'developer') {
      dataToSend.qualification = this.state.qualification;
      dataToSend.specialization = this.state.specialization;
    }

    request('PUT', config.host + '/login', dataToSend, resp => {
      var response = JSON.parse(resp);

      if(response.success) {
        this.setState({
          isEditing: false
        });
        localStorage.userData = JSON.stringify({
          login: this.state.login,
          first_name: this.state.first_name,
          last_name: this.state.last_name
        });
      }
    });
  }
  handleChange(e) {
    this.setState({
      [`${e.target.getAttribute("name")}`]: e.target.value
    });
  }
  handleQualificationChange(e) {
    this.setState({
      qualification: e.target.value
    });
  }
  handleSpecializationChange(e) {
    this.setState({
      specialization: e.target.value
    });
  }
  render() {
    return (
      <div className="content">
        <div className="profile">
          <p className="profile_item">
            {this.state.data.login} :
            {this.state.isEditing ? 
              <input type="text"
                name="login"
                value={this.state.login} 
                className="profile_item_input"
                onChange={this.handleChange.bind(this)} 
                required /> :
              <span className="profile_item_span">{this.state.login}</span>
            }
          </p>
          <p className="profile_item">
            {this.state.data.firstName}  :
            {this.state.isEditing ? 
              <input type="text"
                name="first_name"
                value={this.state.first_name} 
                className="profile_item_input"
                onChange={this.handleChange.bind(this)}
                required /> :
              <span className="profile_item_span">{this.state.first_name}</span>
            }
          </p>
          <p className="profile_item">
            {this.state.data.lastName}  :
            {this.state.isEditing ? 
              <input type="text"
                name="last_name"
                value={this.state.last_name} 
                className="profile_item_input"
                onChange={this.handleChange.bind(this)}/> :
              <span className="profile_item_span">{this.state.last_name}</span>
            }
          </p>
          {this.props.route.name === 'developer' && this.state.isEditing ? 
            <div>
              <p className="profile_item">
                <label>Специализация :</label>
                <select name="specialization" defaultValue={this.state.specialization}
                  className="issue_select"
                  onChange={this.handleSpecializationChange.bind(this)}>
                  <option value="frontend developer">Frontend-разработчик</option>
                  <option value="backend developer">Backend-разработчик</option>
                  <option value="fullstack developer">Fullstack-разработчик</option>
                  <option value="designer">Дизайнер</option>
                </select>
              </p>
              <p className="profile_item">
                <label>Квалификация :</label>
                <select name="qualification" defaultValue={this.state.qualification} 
                  className="issue_select"
                  onChange={this.handleQualificationChange.bind(this)}>
                  <option value="junior">Junior</option>
                  <option value="middle">Middle</option>
                  <option value="senior">Senior</option>
                </select>
              </p> 
            </div> : ''
          }
          {this.state.isEditing ?
            <div>
              <button className="profile_btn profile_btn_pair" onClick={this.saveNewData.bind(this)}>{this.state.data.saveButton}</button>
              <button className="profile_btn profile_btn_pair profile_btn-cancel" onClick={this.cancelEdit.bind(this)}>{this.state.data.cancelButton}</button>
            </div>
            : <button className="profile_btn" onClick={this.editProfile.bind(this)}>{this.state.data.editButton} </button>
          }
        </div>
      </div>
    )
  }
};