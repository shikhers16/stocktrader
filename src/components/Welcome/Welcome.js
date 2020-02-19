import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Welcome.module.css'
import feature1 from './feature1.png';
import feature2 from './feature2.png';
import feature3 from './feature3.png';
import feature4 from './feature4.png';
import feature5 from './feature5.png';
import feature6 from './feature6.png';

import Feature from './Feature';
const layout = (props) => {
	return (
		<main className={classes.welcome}>
			<div className={classes.title}>
				<div className={classes.heading}>
					{props.home}
				</div>
				<span>Simulate your Trades</span>
			</div>
			<div>
				Practice trading in a simulated enviornment that works on real life data.
			</div>
			<Link className={classes.button} to="/signup">
				Sign up
			</Link>
			<div className={classes.features}>
				<Feature src={feature1} heading="Fake Money, Real Data.">
					Make trades on real world data using fake money protecting your capital before you are ready to enter the market.
				</Feature>
				<Feature src={feature2} heading="Custom Watchlists">
					Create multiple Watchlists to track your favourite stocks.
				</Feature>
				<Feature src={feature3} heading="Advanced Charts">
					Inline Advanced Charting Tools from <a className="link" href="https://in.tradingview.com/gopro/?share_your_love=shikher" target="_blank" rel="noopener noreferrer">TradingView<sup>&trade;</sup></a> to hone your technical analysis.
				</Feature>
				<Feature src={feature4} heading="Latest News">
					Stay informed by the latest News articles from various sources.
				</Feature>
				<Feature src={feature5} heading="One App to rule them all">
					A progressive web app that makes it easy to trade from any device.<br />
					It can be installed on all operating systems.
				</Feature>
				<Feature src={feature6} heading="RESTfull API">
					A <a className="link" href="https://documenter.getpostman.com/view/8929301/SWEB1F4J?version=latest" target="_blank" rel="noopener noreferrer">RESTfull API</a> to get data and send orders programatically for training trading algorithms.
				</Feature>
				<Link className={classes.button} to="/signup">
					Sign up
				</Link>
			</div>
		</main >
	)
}

export default layout;