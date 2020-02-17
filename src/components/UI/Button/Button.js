import React from 'react';
import classes from './Button.module.css'
const button = (props) => {
	return (
		<button onClick={props.onclick} className={classes.button + " " + classes[props.color] + " " + classes.className + " " + classes[props.size]}
			tabIndex={props.tabindex} disabled={props.disabled}>
			{props.loading ? <i className="fas fa-spinner fa-spin"></i> : props.children}
		</ button >
	)
}

export default button;