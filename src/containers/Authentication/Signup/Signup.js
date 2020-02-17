import React, { Fragment, Component } from 'react';
import axios from 'axios';

import classes from './Signup.module.css'

import Heading from '../../../components/UI/Heading/Heading';
import Card from '../../../components/UI/Card/Card';
import Form from '../../../components/Form/Form';
import Button from '../../../components/UI/Button/Button';
import Notification from '../../../components/UI/Notification/Notification';

class Signup extends Component {
	state = {
		message: "",
		loading: false,
		notification: "",
		account: {
			normal: {
				name: "",
				email: "",
				username: ""
			},
			secret: {
				password: "",
				"confirm password": ""
			}
		}
	}
	signup = (e) => {
		this.setState({ loading: true });
		const message = this.validate();
		if (message) return this.setState({ message: message, loading: false });
		// upload
		const data = { ...this.state.account.normal, ...this.state.account.secret };
		console.log(data);
		axios.post('/auth/signup/', data)
			.then(response => {
				console.log(response.data);
				this.props.history.replace('/login');
			})
			.catch(error => {
				let message = "can't reach server";
				if (error.response) {
					if (error.response.data.data) message = error.response.data.data[0].msg;
					else if (error.response.data.message) message = error.response.data.message;
					else message = "Internal Server Error";
				}
				return this.setState({ message: message, loading: false });
			})
	}
	cancel = (e) => {
		this.props.history.goBack()
	}
	validate = () => {
		if (!this.state.account.normal.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)) return "invalid email";
		if (this.state.account.secret["password"].length < 8) {
			// return this.setState({ message: "passwords should be atleast 8 characters long" });
			return "passwords should be atleast 8 characters long"
		}
		if ((this.state.account.secret["confirm password"] !== this.state.account.secret.password)) {
			// return this.setState({ message: "passwords do not match" });
			return "passwords do not match";
		}
		let c = this.checkempty();
		if (!c) return "all values are required";
		return null;
	}
	checkempty = () => {
		let c = 1;
		const account = this.state.account;
		for (const key in account["normal"]) {
			if (!account["normal"][key]) c = 0;
		}
		for (const key in account["secret"]) {
			if (!account["secret"][key]) c = 0;
		}
		return c;
	}
	update = (type, name, value) => {
		const newAccount = { ...this.state.account };
		newAccount[type][name] = value;
		return this.setState({ account: newAccount });
	}
	showNotification = (text) => {
		this.setState({ notification: text });
		setTimeout(this.closeNotification, 5000);
	}
	closeNotification = (e) => {
		console.log('closenotfy');
		this.setState({ notification: "" });
	}
	render = () => {
		return (<Fragment>
			<Card >
				<div style={{ margin: "auto" }}>
					<Heading>Signup</Heading>
				</div>
				<span className={classes.message}>{this.state.message}</span>
				<div className={classes.forms}>
					<Form details={this.state.account} update={this.update} notify={this.showNotification} autocomplete="new-password" ></Form>
				</div>
				<div className={classes.center}>
					<Button onclick={(e) => this.signup(e)} color="green" loading={this.state.loading} tabindex="0" >Signup</Button>
					<Button onclick={(e) => this.cancel(e)} color="red" disabled={this.state.loading} >Cancel</Button>
				</div>
			</Card>
			{this.state.notification ? <Notification message={this.state.notification} close={this.closeNotification}></Notification> : null}
		</Fragment >)
	}
}

export default Signup;