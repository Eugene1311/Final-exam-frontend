import React from 'react';
import request from '../../helpers/request';
import config from '../../config/config';
import TaskItem from './taskItem';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tasks: [],
      showOpenButton: false
    };
  }
  componentWillMount() {
    var path = this.context.path || '';
    request('GET', config.host + '/api/tasks' + path, {}, resp => {
      var response = JSON.parse(resp);

      if(response.success) {
        this.setState({
          isLoading: false,
          tasks: response.result,
          showOpenButton: this.context.showOpenButton ? true : false
        });
      }
    });
  }
  render() {
    var userRole = this.context.path ? this.context.path.substring(1) : '';
    return (
      <div className="tasks">
        {this.state.isLoading ? <div>Loading...</div> : ''}
        {
          this.state.tasks.map(task => {
            return <TaskItem
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      dayOfMonth={task.created_at.dayOfMonth}
                      monthValue={task.created_at.monthValue}
                      year={task.created_at.year}
                      checked={task.checked}
                      id={task.id}
                      showOpenButton={this.state.showOpenButton} 
                      isEdited={task.edited_at} 
                      userRole={userRole} />
          }
          )
        }
      </div>
    )
  }
};

TaskList.contextTypes = {
  showOpenButton: React.PropTypes.bool,
  path: React.PropTypes.string
};