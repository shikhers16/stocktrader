import React, { Fragment, Component } from 'react';
import axios from 'axios';

import classes from './Login.module.css'

import Heading from '../../../components/UI/Heading/Heading';
import Card from '../../../components/UI/Card/Card';
import Form from '../../../components/Form/Form';
import Button from '../../../components/UI/Button/Button';
import Notification from '../../../components/UI/Notification/Notification';

class Login extends Component {
	state = {
		message: "",
		loading: false,
		notification: "",
		account: {
			"normal": {
				"username or email": "",
			},
			"secret": {
				"password": "",
			}
		}
	}
	login = (e) => {
		this.setState({ loading: true });
		let c = this.checkempty();
		if (c) return this.setState({ message: "usename/email and password are required", loading: false });
		const data = { password: this.state.account.secret.password }
		const user = this.state.account.normal["username or email"]
		if (user.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)) data.email = user;
		else data.username = user;
		axios.post('/auth/login/', data)
			.then(response => {
				if (response.data) {
					const user = response.data;
					this.setState({ message: user.token, loading: false });
					localStorage.setItem("token", user.token);
					localStorage.setItem("username", user.username);
					localStorage.setItem("userid", user.userid);
					const expiryDate = new Date(new Date().getTime() + user.expiresIn * 1000);
					localStorage.setItem('expiryDate', expiryDate);
					let location = this.props.location.state ? this.props.location.state.from : "/";
					this.props.checklogin();
					return this.props.history.replace(location);
				}
				else {
					this.setState({ message: "Unable to Login", loading: false });
				}
			})
			.catch(error => {
				let message = "can't reach server";
				if (error.response) {
					if (error.response.data.message) message = error.response.data.message;
					else message = "Internal Server Error";
				}
				return this.setState({ message: message, loading: false });
			})
	}
	cancel = (e) => {
		this.props.history.goBack()
	}
	checkempty = () => {
		let c = 0;
		const account = this.state.account;
		for (const key in account["normal"]) {
			if (!account["normal"][key]) c = 1;
		}
		for (const key in account["secret"]) {
			if (!account["secret"][key]) c = 1;
		}
		return c;
	}
	update = (type, name, value) => {
		const newAccount = { ...this.state.account };
		newAccount[type][name] = value;
		return this.setState({ account: newAccount, message: "" });
	}
	showNotification = (text) => {
		this.setState({ notification: text });
		setTimeout(this.closeNotification, 5000);
	}
	closeNotification = (e) => {
		this.setState({ notification: "" });
	}
	render = () => {
		return (<Fragment>
			<Card >
				<div style={{ marginLeft: "auto", marginRight: "auto" }}>
					<Heading>Login</Heading>
				</div>
				<span className={classes.message}>{this.state.message}</span>
				<div className={classes.forms}>
					<Form details={this.state.account} update={this.update} notify={this.props.notify} autocomplete="current-password" ></Form>
				</div>
				<div className={classes.center}>
					<Button onclick={(e) => this.login(e)} loading={this.state.loading} tabindex={0} >Login</Button>
					<Button onclick={(e) => this.cancel(e)} color="red" disabled={this.state.loading} tabindex={4} >Cancel</Button>
				</div>
			</Card>
			{this.state.notification ? <Notification message={this.state.notification} close={this.closeNotification}></Notification> : null}
		</Fragment >)
	}
}

export default Login;