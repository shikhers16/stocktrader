import React from 'react';
import classes from './Notification.module.css'
const notification = (props) => {
	const closeNotification = (e) => {
		props.close();
	}
	return (<div
		className={classes.frame}
		style={{
			WebkitAnimation: `${classes["notify-start"]} 0.5s ease-in-out, ${classes["notify-end"]} 0.5s ease-in-out ${props.timing - 0.5}s`, animation: `${classes["notify-start"]} 0.5s ease-in-out, ${classes["notify-end"]} 0.5s ease-in-out ${props.timing - 0.5}s`
		}}
		id="notification" >
		<span className={classes.message}>
			{props.message}
		</span>
		<button className={classes.cross} onClick={(e) => { closeNotification(e) }}>
			<i className={'fas fa-times ' + classes.i}></i>
		</button>
	</div >)
}

export default notification;