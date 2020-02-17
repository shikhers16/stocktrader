import React from 'react';
import classes from './Notification.module.css'
const notification = (props) => {
	const closeNotification = (e) => {
		props.close();
	}
	// let notficationclass = classes.frame + " " + classes.hide;
	// if (props.show) {
	// 	notficationclass = classes.frame;
	// }
	return (<div className={classes.frame} id="notification">
		<span>
			{props.message}
		</span>
		<button className={classes.cross} onClick={(e) => { closeNotification(e) }}>
			<i className={'fas fa-times ' + classes.i}></i>
		</button>
	</div >)
}

export default notification;