import React, { Fragment, Component } from 'react';
import classes from './Input.module.css'

class Input extends Component {
	state = {
		value: this.props.value,
		name: this.props.name
	}
	change = (value) => {
		this.props.update("normal", this.state.name, value);
		this.setState({ value: value });
	}
	enter = (e) => {
		console.log(e.which, e.key);
		if (e.which == 13 || e.keyCode == 13) {
			e.currentTarget.nextElementSibling.firstChild.click();
		}
	}
	add = () => {
		this.props.add(this.state.value)
		this.setState({ value: "" });
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
		this.props.notify("Copied to Clipboard");
	}
	paste = (e) => {
		if (navigator.clipboard) {
			navigator.clipboard.readText()
				.then(text => {
					this.change(text);
					this.props.notify("Pasted");
				})
				.catch(error => {
					console.log(error);
					this.props.notify("Paste Permission Denied");
				})
		} else {
			this.props.notify("Can't paste");
		}
	}
	shouldComponentUpdate = () => true;
	render() {
		let mainclass = classes.textfield;
		let inputclass = classes.input;
		if (this.props.disabled) {
			mainclass = mainclass + " " + classes.disabled;
			inputclass = inputclass + " " + classes.disabled;
		}
		const autoComplete = (this.props.name === "username" || this.props.name === "email") ? this.props.name : null;
		console.log(autoComplete);
		return (<Fragment>
			<label htmlFor={this.props.name} className={classes.label}>{this.props.name}</label>
			<div className={mainclass}>
				<input type={this.props.type} name={this.props.name} autoComplete={autoComplete} className={inputclass} value={this.state.value} disabled={this.props.disabled} onChange={(e) => this.change(e.currentTarget.value)} onKeyPress={(e) => this.enter(e)} id={this.props.id} tabIndex={this.props.tabindex}></input>
				<div className={classes.buttons}>
					{this.props.add ?
						(<button className={classes.button} onClick={(e) => { e.preventDefault(); this.add(); }}>
							<i className="fas fa-plus"></i>
							<span className={classes.tooltiptextleft}>Add</span>
						</button>)
						:
						(<button className={classes.button} onClick={(e) => { e.preventDefault(); this.copy(e); }}>
							<i className="far fa-copy"></i>
							<span className={classes.tooltiptext}>copy</span>
						</button>)}
					{this.props.add ? null : (<button className={classes.button} onClick={(e) => { e.preventDefault(); this.paste(e);; }}>
						<i className="fas fa-paste"></i>
						<span className={classes.tooltiptext}>paste</span>
					</button>)}
					{this.props.remove ? (<button className={classes.remove} onClick={(e) => { e.preventDefault(); this.props.remove(e); }}>
						<i className="fas fa-times"></i>
						<span className={classes.tooltiptext}>remove field</span>
					</button>) : null}
				</div>
			</div>
		</Fragment >)
	}
}

export default Input;