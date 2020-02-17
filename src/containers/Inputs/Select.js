import React, { Component } from 'react';
import classes from './Select.module.css';

class Select extends Component {
	state = {
		value: this.props.value
	}
	change = (e) => {
		const value = e.currentTarget.value;
		if (value) this.setState({ value: value })
		this.props.change(e, this.props.name, value);
	}
	render = () => {
		const options = this.props.options.map(option => <option key={option} className={classes.select}>{option}</option>)
		return (
			<select name={this.props.name} value={this.state.value} onChange={this.change} className={classes.select}>
				{options}
			</select>
		);
	}
}
export default Select;