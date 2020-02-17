import React, { Fragment } from 'react';
import classes from './AccordianItem.module.css';

import Heading from '../../Heading/Heading';

const AccordianItem = (props) => {
	const something = (x) => {
		console.log(x);
		x.currentTarget.classList.toggle(classes.active);
		let panel = x.currentTarget.nextElementSibling;
		console.log(panel);
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	}
	return (
		<Fragment>
			<button className={classes.accordion} onClick={(e) => something(e)}>{props.heading}</button>
			<div className={classes.panel} >
				<p>{props.children}</p>
			</div>
		</Fragment>
	);
}
export default AccordianItem;