import React, { Component } from 'react';
import axios from 'axios';

import classes from './Details.module.css';

import News from './News/News';
import Logo from '../../../components/UI/Logo/Logo';
import Button from '../../../components/UI/Button/Button';


class Details extends Component {
	state = {
		news: [],
		active: ""
	}
	getNews = () => {
		axios.get(`/stock/news?symbol=${this.props.symbol}`)
			.then(response => {
				console.log(response.data);
				this.setState({ news: response.data, active: this.props.symbol });
			})
			.catch(error => {
				console.log(error.request);
			});
	}
	componentDidMount = () => {
		this.getNews();
	}
	componentDidUpdate = () => {
		if (this.state.active === this.props.symbol) this.getNews();
	}
	render = () => {
		let news = [];
		news = this.state.news.map(news => <News key={news.datetime} time={news.datetime} source={news.source} url={news.url} image={news.image} headline={news.headline} summary={news.summary} />);
		const color = this.props.prices.change > 0 ? classes.green : classes.red;
		const direction = this.props.prices.change > 0 ? classes.up : classes.down;
		return (
			<div className={classes.details}>
				<div className={classes.top}>
					<div className={classes.left}>
						<Logo symbol={this.props.symbol}></Logo>
						<div>
							<div>
								{this.props.symbol}
							</div>
							<sub>
								{this.props.company ? this.props.company : this.props.symbol}
							</sub>
						</div>
					</div>
					<div className={classes.middle}>
						<div style={{ fontSize: "1.2rem" }}>
							${this.props.prices ? this.props.prices.price : null}
						</div>
						<sub className={color} >
							{/* {this.state.percent ? (<div className={classes.changevalue}>{(this.props.prices[symbol].changePercent * 100).toFixed(2) + "%"}</div>) : (<div className={classes.changevalue}>{this.props.prices[symbol].change + "$"}</div>)} */}
							<span className={direction}>
								{(this.props.prices.change + " $")}
							</span>
							<span className={direction}>
								{(this.props.prices.changePercent * 100).toFixed(2) + "%"}
							</span>
						</sub>
					</div>
					<div className={classes.right}>
						<Button onclick={this.props.save} color="green" >BUY</Button>
						<Button color="red" onclick={this.props.cancel}>SELL</Button>
					</div>
				</div>
				{/* <div className={classes.chart}>
				</div> */}
				<div className={classes.news}>
					{news}
				</div>
			</div>
		);
	}
}
export default Details;