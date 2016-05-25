import React from 'react';
import request from '../../helpers/request';
import config from '../../config/config';

export default class DevelopersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      developers: []
    };
  }
  componentWillMount() {
    request('GET', config.host + '/api/users/developers', {}, resp => {
      var response = JSON.parse(resp);

      if(response.success) {
        this.showDevelopers(response.result);
      }
    });
  }
  showDevelopers(result) {
    this.setState({
      isLoading: false,
      developers: result
    });
  }
  render() {
    return (
      <div className="users_wrapper">
        {this.state.isLoading ? <div>Loading...</div> : ''}
        {
          this.state.developers.map(developer => 
            <div key={developer.id}>
              {developer.first_name} {developer.last_name}
              <hr className="line"/>
            </div>
          )
        }
      </div>
    );
  }
};