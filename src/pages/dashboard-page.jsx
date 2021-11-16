import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from '../components/requires-login';
// import {fetchProtectedData} from '../actions/protected-data';

export class DashboardPage extends React.Component {
/*	componentDidMount() {
		this.props.dispatch(fetchProtectedData());
	}*/

	render() {
		return (
			<div className="dashboard">
				<div className="dashboard-username">
					Username: {this.props.username}
				</div>
				<div className="dashboard-email">
					Email: {this.props.email}
				</div>
{/*				<div className="dashboard-protected-data">
					Protected data: {this.props.protectedData}
		</div>*/}
		<Link to='/orders'>Orders</Link>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const {currentUser} = state.auth;
	return {
		username: currentUser.username,
		email: currentUser.email,
		protectedData: state.protectedData.data
	};
};

export default requiresLogin()(connect(mapStateToProps)(DashboardPage));
