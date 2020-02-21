import React, { Component } from 'react';
import axios from 'axios';

import classes from './Details.module.css';

import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import News from '../../../components/News/News';
import Logo from '../../../components/UI/Logo/Logo';
import Button from '../../../components/UI/Button/Button';
import Transaction from '../Transaction/Transaction';

class Details extends Component {
	state = {
		news: [],
		active: "",
		transaction: false,
		side: ""
	}
	closeModal = (e) => {
		this.setState({ transaction: false, side: "" });
	}
	openModal = (side) => {
		window.scrollTo(0, 0);
		this.setState({ transaction: true, side: side });
	}
	getNews = () => {
		axios.get(`/stock/news?symbol=${this.props.symbol}`)
			.then(response => {
				this.setState({ news: response.data, active: this.props.symbol });
			})
			.catch(error => {
				// console.log(error.request);
				console.log("an error occured");
			});
	}
	transaction = (data) => {
		this.closeModal();
		axios.post('/transaction/', data)
			.then(response => {
				if (response.data) {
					this.props.notify(response.data.message, 8);
				}
			})
			.catch(error => {
				console.log("an error occured");
				// console.log(error.request);
			});
	}
	componentDidMount = () => {
		this.getNews();
	}
	componentDidUpdate = () => {
		if (this.state.active !== this.props.symbol) this.getNews();
	}
	render = () => {
		let news = [];
		news = this.state.news.map(news => <News key={news.datetime} time={news.datetime} source={news.source} url={news.url} image={news.image} headline={news.headline} summary={news.summary} />);
		const color = this.props.prices.change > 0 ? classes.green : classes.red;
		return (
			<div className={classes.details}>
				{this.state.transaction ? <Transaction {...this.props} show={this.state.transaction} closeModal={this.closeModal} side={this.state.side} transaction={this.transaction} /> : null}
				<div>
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
						<div className={classes.right}>
							<div style={{ fontSize: "1.2rem" }}>
								${this.props.prices ? this.props.numberWithCommas(this.props.prices.price) : null}
							</div>
							<sub className={color} >
								<span className={classes.changevalue}>
									{(this.props.numberWithCommas(this.props.prices.change) + "$")}
								</span>
								<span className={classes.changevalue}>
									{this.props.numberWithCommas((this.props.prices.changePercent * 100).toFixed(2)) + "%"}
								</span>
							</sub>
						</div>
					</div>
					<div className={classes.bottom}>
						<Button color="green" size="full" onclick={() => this.openModal('buy')} >BUY</Button>
						<Button color="red" size="full" onclick={() => this.openModal('sell')} >SELL</Button>
					</div>
				</div>
				<div className={classes.chart}>
					<TradingViewWidget symbol={this.props.symbol} theme={Themes.DARK} autosize hide_side_toolbar={false} show_popup_button={true} />
				</div>
				<div className={classes.news}>
					{news}
				</div>
			</div>
		);
	}
}
export default Details;