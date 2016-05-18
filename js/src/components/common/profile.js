import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    var language = localStorage.getItem('language');
    var data = language === 'ru' ?
      {
        login: 'Логин',
        firstName: 'Имя',
        lastName: 'Фамилия',
        editButton: 'Редактировать'
      } :
      {
        login: 'Login',
        firstName: 'First name',
        lastName: 'Last name',
        editButton: 'Edit'
      };
    this.state = {
      data: data,
      userInfo: {}
    };

    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.setUserData = this.setUserData.bind(this);
  }
  componentDidMount() {
    window.addEventListener('changeLanguage', this.onChangeLanguage, false);
    window.addEventListener('userLogin', this.setUserData, false);
  }
  componentWillUnmount() {
    window.removeEventListener('changeLanguage', this.onChangeLanguage, false);
    window.removeEventListener('userLogin', this.setUserData, false);
  }
  onChangeLanguage(e) {
    this.setState({
      data: {
        login: e.detail.login,
        firstName: e.detail.firstName,
        lastName: e.detail.lastName,
        editButton: e.detail.editButton
      }
    });
  }
  setUserData(e) {
    this.setState({
      userInfo: e.detail
    });
  }
  editProfile() {
    console.log('editProfile');
  }
  render() {
    return (
      <div className="content">
        <div className="profile">
          <p className="profile_item">
            {this.state.data.login} : {this.state.userInfo.login}
          </p>
          <p className="profile_item">
            {this.state.data.firstName}  : {this.state.userInfo.first_name}
          </p>
          <p className="profile_item">
            {this.state.data.lastName}  : {this.state.userInfo.last_name}
          </p>
          <button className="profile_btn" onClick={this.editProfile}>{this.state.data.editButton} </button>
        </div>
      </div>
    )
  }
};