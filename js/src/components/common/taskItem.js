import React from 'react';
import { Link } from 'react-router';

export default class TaskItem extends React.Component {
	constructor(props) {
		super(props);

    var data = localStorage.getItem('language') === 'ru' ?
      {
        checked: 'Оформлено',
        unchecked: 'Не оформлено',
        createNewIssue: 'Создать новое задание',
        createdAt: 'Создано',
        editedAt: 'Отредактировано',
        openTask: 'Открыть'
      } : {
        checked: 'Checked',
        unchecked: 'Unchecked',
        createNewIssue: 'Create new issue',
        createdAt: 'Created at',
        editedAt: 'Edited at',
        openTask: 'Open task'
      };

    this.state = {
       data: data
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
        checked: e.detail.checked,
        unchecked: e.detail.unchecked,
        createNewIssue: e.detail.createNewIssue,
        createdAt: e.detail.createdAt,
        editedAt: e.detail.editedAt,
        openTask:e.detail.openTask
      }
    });
  }
	render() {
    var { data } = this.state;
		return (
      <div className="task">
        <h3 className="task_title">{this.props.title}</h3>
        <p className="task_created">{data.createdAt}: {this.props.dayOfMonth}. {this.props.monthValue}. {this.props.year}</p>
        {this.props.isEdited ? <p className="task_created">{data.editedAt}: </p> : ''}
        <p className="task_description">{this.props.description}</p>
        <div className={this.props.checked ? 'task_checked task_checked-yes' : 'task_checked task_checked-no'}>
          {this.props.checked ? data.checked : data.unchecked}
        </div>
        {this.props.showOpenButton ? 
          <Link to={"/manager/tasks/" + this.props.id} className="task_open_btn">{data.openTask}</Link> : ''
        }
        {this.props.showCreateButton ? 
          <a href="#" className="task_new_issue" onClick={this.props.addIssue}>
          	{data.createNewIssue}
        	</a> : ''
        }
        <hr className="line"/>
      </div>
		)
	}
};