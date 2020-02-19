import React, { Component } from 'react';

import classes from './Transaction.module.css';

import Button from '../../../components/UI/Button/Button';
import Logo from '../../../components/UI/Logo/Logo';
import Modal from '../../../components/UI/Modal/Modal';
import Number from '../../Inputs/Number';
import Select from '../../Inputs/Select';

class Transaction extends Component {
	state = {
		SIDE: this.props.side,
		QTY: 1,
		ORDER: 'MARKET',
		PRICE: this.props.prices.price,
		TRIGGER: ""
	}
	change = (e, name, value) => {
		if (name === "SIDE") this.setState({ SIDE: value });
		else if (name === "ORDER") this.setState({ ORDER: value });
	}
	update = (type, name, value) => {
		if (name === "QTY") return this.setState({ QTY: value });
		if (name === "PRICE") return this.setState({ PRICE: value });
		if (name === "TRIGGER") return this.setState({ TRIGGER: value });
	}
	transaction = () => {
		let data;
		switch (this.state.ORDER) {
			case 'MARKET':
				data = { type: 'market', symbol: this.props.symbol, side: this.state.SIDE, qty: this.state.QTY };
				break;
			case 'LIMIT':
				data = { type: 'limit', symbol: this.props.symbol, side: this.state.SIDE, qty: this.state.QTY, price: this.state.PRICE };
				break;
			case 'STOP MARKET':
				data = { type: 'stop market', symbol: this.props.symbol, side: this.state.SIDE, qty: this.state.QTY, trigger: this.state.TRIGGER };
				break;
			case 'STOP LIMIT':
				data = { type: 'stop limit', symbol: this.props.symbol, side: this.state.SIDE, qty: this.state.QTY, price: this.state.PRICE, trigger: this.state.TRIGGER };
				break;
			default:
				return;
		}
		this.props.transaction(data);
	}
	render = () => {
		const color = this.props.prices.change > 0 ? classes.green : classes.red;
		return (
			<Modal show={this.props.show} clicked={this.props.closeModal}>
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
							${this.props.prices ? this.props.prices.price : null}
						</div>
						<sub className={color} >
							<span className={classes.changevalue}>
								{(this.props.prices.change + "$")}
							</span>
							<span className={classes.changevalue}>
								{(this.props.prices.changePercent * 100).toFixed(2) + "%"}
							</span>
						</sub>
					</div>
				</div>
				<div className={classes.middle}>
					<div className={classes.input}>
						<span>SIDE</span> <Select options={['buy', 'sell']} name="SIDE" value={this.state.SIDE} change={this.change} />
					</div>
					<div className={classes.input}>
						<span>ORDER</span> <Select options={['MARKET', 'LIMIT', 'STOP MARKET', 'STOP LIMIT']} name="ORDER" value={this.state.ORDER} change={this.change} />
					</div>
					<div className={classes.input}>
						<Number value={this.state.QTY} min={0} update={this.update} name="QTY" />
					</div>
					{this.state.ORDER.includes("STOP") ?
						(<div className={classes.input}>
							<Number value={this.state.TRIGGER} min={0} update={this.update} name="TRIGGER" disabled={this.state.ORDER === 'MARKET'} />
						</div>) : null}
					<div className={classes.input}>
						<Number value={this.state.PRICE} min={0} update={this.update} name="PRICE" disabled={this.state.ORDER.includes('MARKET')} />
					</div>
				</div>
				<div className={classes.bottom}>
					{this.state.SIDE === 'buy' ? (<Button color="green" size="full" onclick={this.transaction} >BUY</Button>) : null}
					{this.state.SIDE === 'sell' ? (<Button color="red" size="full" onclick={this.transaction} >SELL</Button>) : null}
					<Button onclick={this.props.closeModal} size="full">Cancel</Button>
				</div>
			</Modal >
		);
	}
}
export default Transaction;