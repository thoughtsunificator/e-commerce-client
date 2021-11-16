import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {Link} from 'react-router-dom';
import  Search from './search';

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
					<li><Link to="/cart"><img src="/SVG/basket.svg" className="icon" alt="#" /><small>{/* this.props.cart.filter((item, index, self) => {
							let findIndex = self.findIndex(itemB => item.id === itemB.id)
							return findIndex === index
						}) */this.props.cart.length}</small></Link><span>Panier</span></li>
					{this.props.currentUser === null ?
							<li><Link to="/login"><img src="/SVG/user.svg" className="icon" alt="#" /></Link><span>Login</span></li>
					: [
						this.props.currentUser.roles.includes("ROLE_ADMIN") && (
							<li><a href="/admin" target="_blank"><img src="/SVG/settings.svg" className="icon" alt="#" /></a><span>Admin</span></li>

						),
						<>
							<li><Link to="/dashboard"><img src="/SVG/dashboard.svg" className="icon" alt="#" /></Link><span>Dashboard</span></li>
							<li onClick={() => this.logOut()}><img src="/SVG/logout.svg" className="icon" id="logout" alt="#" /><span>Logout</span></li>
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
