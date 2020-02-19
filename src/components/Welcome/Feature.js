import React, { Fragment } from 'react';
import classes from './Feature.module.css'

const Feature = (props) => {
	return (
		<Fragment>
			<div className={classes.feature}>
				<h1 className={classes.heading}>{props.heading}</h1>
				<img src={props.src} alt="" className={classes.image}></img>
				<div className={classes.text}>
					{props.children}
				</div>
			</div>
		</Fragment >
	)
}

export default Feature;