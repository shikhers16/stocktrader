import React, { Fragment, Component } from 'react';
import axios from 'axios';

import classes from './Secret.module.css'

class Secret extends Component {
	state = {
		value: this.props.value,
		name: this.props.name,
		type: "password",
		hidden: true
	}
	generatepassword = (e) => {
		axios.get('/auth/securepassword?number=1')
			.then(response => {
				const password = response.data.passwords[0];
				this.change(password);
			})
			.catch(error => {
				return true;
			})
	}
	change = (value) => {
		this.props.update("secret", this.state.name, value);
		this.setState({ value: value });
	}
	toggleShow = (e) => {
		if (this.state.type !== 'password') {
			this.setState({ type: "password", hidden: true });
		}
		else {
			this.setState({ type: "text", hidden: false });
		}
	}
	copy = async (e) => {
		/* Get the text field */
		let input = e.currentTarget.parentElement.parentElement.firstChild;
		let p = false;
		let d = false;
		/* Select the text field */
		if (input.type === "password") {
			input.type = "text";
			p = true;
		}
		if (input.disabled) {
			input.disabled = false;
			d = true;
		}
		try {
			await navigator.clipboard.writeText(input.value);
		}
		catch{
			input.select();
			input.setSelectionRange(0, input.value.length);
			document.execCommand("copy");
			input.setSelectionRange(0, 0);
		}
		if (p) input.type = "password";
		if (d) input.disabled = true;
		this.props.notify("Copied to Clipboard", 5);
	}
	paste = (e) => {
		if (navigator.clipboard) {
			navigator.clipboard.readText()
				.then(text => {
					this.change(text);
					this.props.notify("Pasted", 5);
				})
				.catch(error => {
					this.props.notify("Paste Permission Denied", 5);
				})
		} else {
			this.props.notify("Can't paste", 5);
		}
	}
	render() {
		let mainclass = classes.secret;
		let inputclass = classes.password;
		if (this.props.disabled) {
			mainclass = mainclass + " " + classes.disabled;
			inputclass = inputclass + " " + classes.disabled;
		}
		return (
			<Fragment>
				<label htmlFor={this.props.name} className={classes.label}>{this.props.name}</label>
				<div className={mainclass}>
					<input type={this.state.type} name={this.props.name} autoComplete={this.props.autocomplete} className={inputclass} value={this.state.value} disabled={this.props.disabled} onChange={(e) => this.change(e.currentTarget.value)} tabIndex={this.props.tabindex}></input>
					<div className={classes.buttons}>
						<button className={classes.button} onClick={(e) => { e.preventDefault(); this.toggleShow(e) }}>
							{this.state.hidden ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
							<span className={classes.tooltiptext}>{this.state.hidden ? "show" : "hide"}</span>
						</button>
						<button className={classes.button} onClick={(e) => { e.preventDefault(); this.copy(e) }}>
							<i className="far fa-copy"></i>
							<span className={classes.tooltiptext}>copy</span>
						</button>
						{this.props.disabled ? null : (
							<button className={classes.button} onClick={(e) => { e.preventDefault(); this.paste(e) }}>
								<i className="fas fa-paste"></i>
								<span className={classes.tooltiptext}>paste</span>
							</button>)}
					</div>
				</div >
			</Fragment>)
	}
}

export default Secret;