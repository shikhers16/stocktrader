import React from 'react';
import classes from './Listitem.module.css'
const listitem = (props) => {
	const finalClass = classes.listitem + " " + props.className + " " + (props.editing ? classes.edit : null)
	return (<div className={finalClass} onClick={props.clicked}>{props.children}</div>)
}
export default listitem;