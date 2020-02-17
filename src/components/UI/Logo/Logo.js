import React from 'react';
import classes from './Logo.module.css';

const Logo = (props) => {
	const logoClass = classes.container + " " + (props.centered ? classes.centered : null);
	return (
		<div className={logoClass}>
			<img className={classes.logo}
				src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${props.symbol.toUpperCase()}.png`}
				alt={props.symbol + " logo"}
			>
			</img>
		</div>
	);
}
export default Logo;