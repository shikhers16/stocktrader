import React from 'react';
import classes from './News.module.css';

import LinkButton from '../UI/Button/LinkButton';

const News = (props) => {
	return (
		<div className={classes.news}>
			<div className={classes.heading}>
				<h2>{props.headline}</h2>
				<h6>{(new Date(props.time * 1000)).toLocaleString()}</h6>
			</div>
			<div>
				<div className={classes.imagecontainer}>
					<img src={props.image} alt={props.source} className={classes.image}></img>
				</div>
				<p>{props.summary}</p>
			</div>
			<LinkButton url={props.url}>{props.source}</LinkButton>
		</div>
	);
}
export default News;