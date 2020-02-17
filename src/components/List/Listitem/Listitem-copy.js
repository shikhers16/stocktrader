import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Listitem-copy.module.css'
const listitem = (props) => {
	return (<div className={classes.listitem}>{props.children}</div>)
}
export default listitem;