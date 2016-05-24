import React from 'react';
import $ from 'jquery';
import request from '../../helpers/request';
import config from '../../config/config';

export default class Issue extends React.Component {
	constructor(props) {
		super(props);

    var data = localStorage.getItem('language') === 'ru' ?
      {
        saveButton: 'Сохранить',
        deleteButton: 'Удалить',
        taskTitleLabel: 'Название задания',
        taskDescriptionLabel: 'Описание задания'
      } : {
        saveButton: 'Save',
        deleteButton: 'Delete',
        taskTitleLabel: 'Task title',
        taskDescriptionLabel: 'Task description'
      };

    this.state = {
       data: data
    };

    this.onChangeLanguage = this.onChangeLanguage.bind(this);
	}
  componentDidMount() {
  	console.log($);
    window.addEventListener('changeLanguage', this.onChangeLanguage, false);
  }
  componentWillUnmount() {
    window.removeEventListener('changeLanguage', this.onChangeLanguage, false);
  }
  onChangeLanguage(e) {
    this.setState({
      data: {
        saveButton: e.detail.saveButton,
        deleteButton: e.detail.deleteButton,
        taskTitleLabel: e.detail.taskTitleLabel,
        taskDescriptionLabel: e.detail.taskDescriptionLabel
      }
    });
  }
	removeIssue() {
		var event = new CustomEvent('removeIssue', {
			detail: this.props.index
		});
		window.dispatchEvent(event);
	}
	saveIssue() {
		request('POST', config.host + '/api/issues/new', {}, resp => {
			console.log(resp);
		});
	}
	searchDeveloper(event) {
		event.preventDefault();

		// request('GET', config.host + '/api/users/developers', {test: 'test'}, resp => {
		// 	console.log(JSON.parse(resp));
		// });
		$.get(config.host + '/api/users/developers', {test: 'test'}, resp => {
			console.log(resp);
		});
	}
	render() {
		var { data } = this.state;
		return (
			<div className="issue">
				<form className="task_form issue_form">
					<label for="taskTitle">{data.taskTitleLabel} :</label>
					<input
						id="taskTitle"
						name="taskTitle"
						type="text"
						className="task_form_item task_form_input"
						required/>
					<label>{data.taskDescriptionLabel} :</label>
					<textarea
						name="taskDescription"
						className="task_form_item task_form_textarea">
					</textarea>
					<div>Выбрать разработчика :</div>
					<div className="issue_select_group">
						<label>Специализация :</label>
						<select name="" id="" className="issue_select">
							<option value="">Frontend-разработчик</option>
							<option value="">Backend-разработчик</option>
							<option value="">Fullstack-разработчик</option>
							<option value="">Дизайнер</option>
						</select>
						<label>Квалификация :</label>
						<select name="" id="" className="issue_select">
							<option value="">Junior</option>
							<option value="">Middle</option>
							<option value="">Senior</option>
						</select>
						<a href="#" className="profile_btn issue_search" onClick={this.searchDeveloper}>Поиск</a>
					</div>
					<input type="submit" 
						value={data.saveButton} 
						className="profile_btn issue_btn"
						onClick={this.saveIssue.bind(this)}/>
					<input type="button" 
						value={data.deleteButton}  
						className="profile_btn issue_btn issue_btn-delete" 
						onClick={this.removeIssue.bind(this)} />
				</form>
				<hr className="line" />
			</div>
		)
	}
};