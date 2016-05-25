import React from 'react';
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
       data: data,
       qualification: 'middle',
       specialization: 'fullstack developer',
       developers: []
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
		var params = 'specialization=' + encodeURIComponent(this.state.specialization) + '&qualification=' + encodeURIComponent(this.state.qualification);

		request('GET', config.host + '/api/users/find-developers?' + params, {}, resp => {
			console.log(JSON.parse(resp));
			var response = JSON.parse(resp);

			if(response.success) {
				this.setState({
					developers: response.result
				});
			}
		});
	}
	chooseDeveloper(e) {
		console.log(e.target.closest('tr').dataset.login);
	}
	handleChange(e) {
		this.setState({
			[`${e.target.getAttribute("name")}`]: e.target.value
		});
	}
	render() {
		var { data, qualification, specialization, developers } = this.state;
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
						<select name="specialization"
								className="issue_select"
								defaultValue={specialization}
								onChange={this.handleChange.bind(this)}>
							<option value="frontend developer">Frontend-разработчик</option>
							<option value="backend developer">Backend-разработчик</option>
							<option value="fullstack developer">Fullstack-разработчик</option>
							<option value="designer">Дизайнер</option>
						</select>
						<label>Квалификация :</label>
						<select name="qualification"
								className="issue_select"
								defaultValue={qualification}
								onChange={this.handleChange.bind(this)}>
							<option value="junior">Junior</option>
							<option value="middle">Middle</option>
							<option value="senior">Senior</option>
						</select>
						<a href="#" className="profile_btn issue_search" onClick={this.searchDeveloper.bind(this)}>Поиск</a>
					</div>
					{developers.length > 0 ?
						<table className="developers_table">
							<thead className="developers_table_head">
								<tr className="developers_table_row">
									<td className="developers_table_cell">First Name</td>
									<td className="developers_table_cell">Last Name</td>
								</tr>
							</thead>
							<tbody>
								{
									developers.map(developer =>
											<tr key={developer.login} 
													className="developers_table_row developers_table_row-body"
													data-login={developer.login}
													onClick={this.chooseDeveloper.bind(this)}>
												<td className="developers_table_cell">{developer.first_name}</td>
												<td className="developers_table_cell">{developer.last_name}</td>
											</tr>
										)
								}
							</tbody>
						</table> : ''
					}
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