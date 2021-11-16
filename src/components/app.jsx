import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Switch} from 'react-router-dom';

import HeaderBar from './header-bar';

import LandingPage from '../pages/landing-page';
import AdminPage from '../pages/admin-page';
import DashboardPage from '../pages/dashboard-page';
import RegistrationPage from '../pages/registration-page';
import LoginPage from '../pages/login-page';
import ShopsPage from '../pages/shops-page';
import ShopPage from '../pages/shop-page';
import DetailsProduct from '../pages/product-page';
import CartPage from '../pages/cart-page'
import CheckoutPage from '../pages/checkout-page'
import OrdersPage from '../pages/orders-page'

import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
		componentDidUpdate(prevProps) {
				if (!prevProps.loggedIn && this.props.loggedIn) {
					// When we are logged in, refresh the auth token periodically
					this.startPeriodicRefresh();
				} else if (prevProps.loggedIn && !this.props.loggedIn) {
					// Stop refreshing when we log out
					this.stopPeriodicRefresh();
				}
		}

		componentWillUnmount() {
			this.stopPeriodicRefresh();
		}

		startPeriodicRefresh() { // FIXME React admin might need some glue to work with this
			this.refreshInterval = setInterval(
					() => this.props.dispatch(refreshAuthToken()),
					60 * 60 * 1000 // One hour
			);
		}

		stopPeriodicRefresh() {
			if (!this.refreshInterval) {
					return;
			}

			clearInterval(this.refreshInterval);
		}

		render() {
				return (
						<Switch>
							<Route exact path="/admin" component={AdminPage} />
							<React.Fragment>
								<HeaderBar />
								<Switch>
									<Route exact path="/" component={LandingPage} />
									<Route exact path="/register" component={RegistrationPage} />
									<Route exact path="/login" component={LoginPage} />
									<Route exact path="/dashboard" component={DashboardPage} />
									<Route exact path="/category/:id" component={ShopsPage} />
									<Route exact path="/category/:cat_id/shop/:shop_id" component={ShopPage} />
									<Route exact path="/product/:product_id" component={DetailsProduct} />
									<Route exact path="/cart" component={CartPage} />
									<Route exact path="/checkout" component={CheckoutPage} />
									<Route exact path="/orders" component={OrdersPage} />
									<Route><div>404 Not found</div></Route>
								</Switch>
							</React.Fragment>
						</Switch>
				);
		}
}

const mapStateToProps = state => ({
		hasAuthToken: state.auth.authToken !== null,
		loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
