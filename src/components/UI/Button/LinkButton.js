import React from 'react';
import classes from './Button.module.css'
const button = (props) => {
	return (
		<a href={props.url} className={classes.button + " " + classes[props.color] + " " + classes.className + " " + classes[props.size]}
			disabled={props.disabled} target="_blank" rel="noopener noreferrer">
			{props.loading ? <i className="fas fa-spinner fa-spin"></i> : props.children}
		</ a >
	)
}

export default button;