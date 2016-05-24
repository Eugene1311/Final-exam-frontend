import React from 'react';
import request from '../../helpers/request';
import config from '../../config/config';

export default class CustomersList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			customers: []
		};
	}
	componentWillMount() {
    request('GET', config.host + '/api/users/customers', {}, resp => {
      var response = JSON.parse(resp);

      if(response.success) {
        this.showCustomers(response.result);
      }
    });
	}
  showCustomers(result) {
  	this.setState({
  		isLoading: false,
  		customers: result
  	});
  }
	render() {
		return (
			<div className="users_wrapper">
				{this.state.isLoading ? <div>Loading...</div> : ''}
				{
					this.state.customers.map(customer => 
						<div key={customer.id}>
							{customer.first_name} {customer.last_name}
							<hr className="line"/>
						</div>
					)
				}
			</div>
		);
	}
};