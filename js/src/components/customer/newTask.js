import React from 'react';
import request from '../../helpers/request';
import config from '../../config/config';
import classNames from 'classnames';

export default class NewTask extends React.Component {
	constructor(props) {
		super(props);

		var localData = localStorage.getItem('language') === 'ru' ?
			{
				taskTitleLabel: 'Название задания',
				taskDescriptionLabel: 'Описание задания',
				onSaveMessage: 'Задание сохранено',
				saveButton: 'Сохранить'
			} :
			{
				taskTitleLabel: 'Task title',
				taskDescriptionLabel: 'Task description',
				onSaveMessage: 'Task saved',
				saveButton: 'Save'
			};

		this.state = {
			taskTitle: '',
			taskDescription: '',
			isHidden: true,
			localData: localData
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
      localData: {
        taskTitleLabel: e.detail.taskTitleLabel,
				taskDescriptionLabel: e.detail.taskDescriptionLabel,
				onSaveMessage: e.detail.onSaveMessage,
				saveButton: e.detail.saveButton
      }
    });
  }
	saveTask(event) {
		event.preventDefault();
		var dataToSend = {
			taskTitle: this.state.taskTitle,
			taskDescription: this.state.taskDescription
		};
		var that = this;

		request('POST', config.host + '/api/tasks/new', dataToSend, (resp) => {
			var resp = JSON.parse(resp);
			if(resp.success) {
				that.setState({
					taskTitle: '',
					taskDescription: '',
					isHidden: false				
				});
			}
		});
	}
	handleChange(e) {
    this.setState({
      [`${e.target.getAttribute("name")}`]: e.target.value
    });
  }
  hideNotification() {
  	this.setState({
  		isHidden: true
  	});
  }
	render() {
    var notifyClass = classNames({
      'task_form_notification': true,
      'task_form_notification-hidden': this.state.isHidden
    });
		return (
			<form className="task_form" onSubmit={this.saveTask.bind(this)}>
				<div className={notifyClass}>
					{this.state.localData.onSaveMessage}
				</div>
				<label for="taskTitle">{this.state.localData.taskTitleLabel} :</label>
				<input
					id="taskTitle"
					name="taskTitle"
					type="text"
					className="task_form_item task_form_input"
					required
					value={this.state.taskTitle}
					onChange={this.handleChange.bind(this)}
					onFocus={this.hideNotification.bind(this)}/>
				<label>{this.state.localData.taskDescriptionLabel} :</label>
				<textarea
					name="taskDescription"
					className="task_form_item task_form_textarea"
					value={this.state.taskDescription}
					onChange={this.handleChange.bind(this)}
					onFocus={this.hideNotification.bind(this)}>
				</textarea>
				<input type="submit" value={this.state.localData.saveButton} className="profile_btn"/>
			</form>
		)
	}
}