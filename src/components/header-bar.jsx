import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {Link} from 'react-router-dom';
import  Search from './search';

import IconBasket from "../images/SVG/basket.svg"
import IconDashboard from "../images/SVG/dashboard.svg"
import IconUser from "../images/SVG/user.svg"
import IconSettings from "../images/SVG/settings.svg"
import IconLogout from "../images/SVG/logout.svg"

export class HeaderBar extends React.Component {

	logOut() {
		this.props.dispatch(clearAuth());
		localStorage.removeItem("token")
		localStorage.removeItem("refreshToken")
	}

	render() {
		return	(
			<div className="header-bar">
				<Link to="/"><h1 id="logo">UNIVERSHOP</h1></Link>
				<Search />
				<ul>
					<li><Link to="/cart"><img src={IconBasket} className="icon" alt="#" /><small>{/* this.props.cart.filter((item, index, self) => {
							let findIndex = self.findIndex(itemB => item.id === itemB.id)
							return findIndex === index
						}) */this.props.cart.length}</small></Link><span>Panier</span></li>
					{this.props.currentUser === null ?
							<li><Link to="/login"><img src={IconUser} className="icon" alt="#" /></Link><span>Login</span></li>
					: [
						this.props.currentUser.roles.includes("ROLE_ADMIN") && (
							<li><a href="/admin" target="_blank"><img src={IconSettings} className="icon" alt="#" /></a><span>Admin</span></li>

						),
						<>
							<li><Link to="/dashboard"><img src={IconDashboard} className="icon" alt="#" /></Link><span>Dashboard</span></li>
							<li onClick={() => this.logOut()}><img src={IconLogout} className="icon" id="logout" alt="#" /><span>Logout</span></li>
						</>
					]
					}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.cart,
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HeaderBar);
