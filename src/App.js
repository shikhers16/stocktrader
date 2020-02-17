import React, { Component } from 'react';
import './App.css';

import { withRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { isMobile, isMobileOnly } from 'react-device-detect';
import axios from 'axios';

import Signup from './containers/Authentication/Signup/Signup';
import Login from './containers/Authentication/Login/Login';
import Logout from './containers/Authentication/Logout/Logout';

import Stocks from './containers/Stocks/Stocks';
import Details from './containers/Stocks/Details/Details';

class App extends Component {
	state = {
		isAuth: false,
		username: null,
		sideDrawer: false,
		active: null
	}
	togglesideDrawer = () => {
		let toggle = true;
		if (this.state.sideDrawer) toggle = false;
		console.log(toggle);
		this.setState({ sideDrawer: toggle });
	}
	autologin = () => {
		let isAuth = false;
		let username = null;
		console.log('wtf');
		if (localStorage.length) {
			const expiryDate = new Date(localStorage.getItem('expiryDate'));
			if (expiryDate > new Date()) {
				username = localStorage.getItem('username');
				const token = localStorage.getItem('token');
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				isAuth = true;
				console.log('logged in');
			}
		}
		this.setState({ isAuth: isAuth, username: username });
	}
	activate = (symbol, company, prices) => {
		this.setState({ active: { symbol: symbol, company: company, prices: prices } });
		this.props.history.push('/details');
	}
	numberWithCommas = (x) => {
		var parts = x.toString().split(".");
		return parts[0].replace(/\B(?=(\d{3})+(?=$))/g, ",") + (parts[1] ? "." + parts[1] : "");
	}
	componentDidMount = () => {
		this.autologin();
	}
	render = () => {
		const home = <span className="center">Stock Trader</span>;
		let routes = null;
		let navbar = null;
		let footbar = (
			<nav className="navbar">
				<div className="navgroup">
					<a href="https://www.shikhersrivastava.com" className="navlink" target="_blank" rel="noopener noreferrer" >Home (Shikher Srivastava)</a >
				</div>
				<div className="navgroup">
					<a href="https://www.linkedin.com/in/shikhersrivastava/" className="navlink" target="_blank" rel="noopener noreferrer" >LinkedIn</a>
					<a href="https://www.github.com/shikhers16" className="navlink" target="_blank" rel="noopener noreferrer" >Github</a>
				</div>
			</nav>
		);
		if (this.state.isAuth) {
			if (isMobile) {
				routes = (
					<div className="main">
						<Switch>
							<Route path="/" exact render={(props) => <Stocks {...props} numberWithCommas={this.numberWithCommas} activate={this.activate} />} />
							{this.state.active ? <Route path="/" render={(props) => <Details {...props} numberWithCommas={this.numberWithCommas} symbol={this.state.active.symbol} company={this.state.active.company} prices={this.state.active.prices} />}></Route> : null}
							<Route path="/logout" exact render={(props) => <Logout {...props} checklogin={this.autologin} />} />
						</Switch>
					</div>
				);
			}
			else {
				routes =
					<div className="main">
						<Route path="/" render={(props) => <Stocks {...props} numberWithCommas={this.numberWithCommas} activate={this.activate} />} />
						{this.state.active ? <Route path="/" render={(props) => <Details {...props} numberWithCommas={this.numberWithCommas} symbol={this.state.active.symbol} company={this.state.active.company} prices={this.state.active.prices} />}></Route> : null}
						<Route path="/logout" exact render={(props) => <Logout {...props} checklogin={this.autologin} />} />
					</div>

			}
			navbar = (<nav className="navbar">
				<div className="navgroup">
					<NavLink to="/" className="navlink">{home}</NavLink>
				</div>
				<div className="navgroup">
					<NavLink to="/logout" className="navlink">Logout</NavLink>
				</div>
			</nav>
			);
		}
		else {
			routes = (
				<Switch>
					<Route path="/signup" component={Signup} />
					<Route path="/login" render={(props) => <Login {...props} checklogin={this.autologin} />} />
					{/* <Route path="/" exact render={(props) => <Welcome {...props} home={home} />} /> */}
					{/* <Redirect to="/" /> */}
				</Switch>
			)
			navbar = (<nav className="navbar">
				<div className="navgroup">
					<NavLink to="/" exact className="navlink">{home}</NavLink>
				</div>
				<div className="navgroup">
					<NavLink to="/signup" className="navlink">Signup</NavLink>
					<NavLink to="/login" className="navlink">Login</NavLink>
				</div>
			</nav>
			)
		}
		return (
			<div className="App" >
				<div>
					<header>
						{navbar}
					</header>
					<main>
						{routes}
					</main>
				</div>
				<footer className="footer">
					{footbar}
				</footer>
			</div >
		);
	}
}

export default withRouter(App);
