import React from 'react';
import request from '../../helpers/request';
import config from '../../config/config';
import TaskItem from './taskItem';
import Issue from './issue';

export default class Task extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				title: '',
				created_at: {},
				checked: '',
				id: ''
			},
			issues: []
		};

		this.removeIssue = this.removeIssue.bind(this);
	}
	componentWillMount() {
		const { id } = this.props.params;
		request('GET', config.host + '/api/tasks/' + id, {}, resp => {
			const { result } = JSON.parse(resp);

			this.setState({
				data: result
			});
		});
	}
	componentDidMount() {
    window.addEventListener('removeIssue', this.removeIssue, false);  
  }
  componentWillUnmount() {
    window.removeEventListener('removeIssue', this.removeIssue, false); 
  }
	addIssue(event) {
		event.preventDefault();
		this.setState(previousState => 
			previousState.issues.push({})
		);
	}
	removeIssue(e) {
		this.setState(previousState =>
			previousState.issues.splice(e.detail, 1)
		);
	}
	render() {
		const { data, issues } = this.state;
		return (
			<div className="tasks">
	      <TaskItem addIssue={this.addIssue.bind(this)} 
					title={data.title}
					description={data.description}
					dayOfMonth={data.created_at.dayOfMonth}
					monthValue={data.created_at.dayOfMonth}
					year={data.created_at.year}
					checked={data.checked}
					showCreateButton={true} />
					{
						issues.map((issue, i) => {
							return <div key={i}>
											<Issue index={i}/>
										</div>;
						})
					}
			</div>
		)
	}
};