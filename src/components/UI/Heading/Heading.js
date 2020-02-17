import React from 'react';
import classes from './Heading.module.css'
const card = (props) => {
	return (<h3 className={classes.heading + " " + props.className}  >{props.children}</h3>)
}

export default card;