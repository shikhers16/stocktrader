import React, { Fragment } from 'react';
import classes from './Form.module.css'

import Input from '../../containers/Inputs/Input';
import Secret from '../../containers/Inputs/Secret';
const Form = (props) => {
	const formcontrols = [];
	let idx = 1;
	for (const key in props.details) {
		if (props.details.hasOwnProperty(key)) {
			const element = props.details[key];
			idx++;
			switch (key) {
				case "normal":
					for (const name in element) {
						if (element.hasOwnProperty(name)) {
							const value = element[name];
							formcontrols.push(<div className={classes.formcontrol} key={name + idx} >
								<Input type="text" name={name} value={value} disabled={props.disabled} remove={props.remove} tabindex={idx} update={props.update} notify={props.notify} ></Input>
							</div>);
						}
					}
					break;
				case "secret":
					for (const name in element) {
						if (element.hasOwnProperty(name)) {
							const value = element[name];
							formcontrols.push(<div className={classes.formcontrol} key={name + idx} >
								<Secret type="text" name={name} value={value} disabled={props.disabled} remove={props.remove} tabindex={idx} update={props.update} notify={props.notify} autocomplete={props.autocomplete} ></Secret>
							</div>);
						}
					}
					break;
				default:
					break;
			}
		}
	}
	return (
		<Fragment>
			<form className={classes.form} action="#"
				method="POST" encType="application/x-www-form-urlencoded">
				{formcontrols}
			</form>
		</Fragment>
	)
}

export default Form;