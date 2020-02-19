import React, { Fragment, Component } from 'react';
import classes from './Number.module.css'

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
		if (e.which === 13 || e.keyCode === 13) {
			e.currentTarget.nextElementSibling.firstChild.click();
		}
	}
	add = () => {
		this.props.add(this.state.value)
		this.setState({ value: "" });
	}
	render() {
		let mainclass = classes.textfield;
		let inputclass = classes.input;
		if (this.props.disabled) {
			mainclass = mainclass + " " + classes.disabled;
			inputclass = inputclass + " " + classes.disabled;
		}
		const autoComplete = (this.props.name === "username" || this.props.name === "email") ? this.props.name : null;
		return (<Fragment>
			<label htmlFor={this.props.name} className={classes.label}>{this.props.name}</label>
			<div className={mainclass}>
				<input type="number" min={this.props.min} max={this.props.max} name={this.props.name} autoComplete={autoComplete} className={inputclass} value={this.state.value} disabled={this.props.disabled} onChange={(e) => this.change(e.currentTarget.value)} onKeyPress={(e) => this.enter(e)} id={this.props.id} tabIndex={this.props.tabindex}></input>
				<div className={classes.buttons}>
					{this.props.add ?
						(<button className={classes.button} onClick={(e) => { e.preventDefault(); this.add(); }}>
							<i className="fas fa-plus"></i>
							<span className={classes.tooltiptextleft}>Add</span>
						</button>)
						:
						<span className={classes.nothing} disabled><i className="fas fa-stream"></i></span>}
				</div>
			</div>
		</Fragment >)
	}
}

export default Input;