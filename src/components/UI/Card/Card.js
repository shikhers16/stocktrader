import React from 'react';
import classes from './Card.module.css'
const card = (props) => {
	return (<div className={classes.card + " " + classes[props.size]}>{props.children}</div>)
}

export default card;