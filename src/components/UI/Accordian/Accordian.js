import React from 'react';
import classes from './Accordian.module.css';
const Accordian = (props) => {
	return (
		<div className={classes.accordian}>
			{props.children}
		</div>
	);
}
export default Accordian;