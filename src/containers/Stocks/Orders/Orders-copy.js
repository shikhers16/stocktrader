import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classes from './Orders-copy.module.css'
import Heading from '../../../components/UI/Heading/Heading';
import Logo from '../../../components/UI/Logo/Logo';
import Button from '../../../components/UI/Button/Button';
import Listitem from '../../../components/List/Listitem/Listitem';
class Order extends Component {
	state = {
		open: false,
		panel: null,
		percent: false,
		slide: false
	}
	toggleDropdown = (x) => {
		console.log(this.state.panel);
		x.currentTarget.classList.toggle(classes.active);
		let arrow = x.currentTarget.lastChild;
		let panel = x.currentTarget.parentElement.nextElementSibling;
		console.log(panel.style.display);
		if (panel.style.maxHeight) {
			arrow.innerHTML = '<i class="fas fa-chevron-down"></i>';
			// panel.style.display = "none";
			// panel.style.paddingBottom = "0";
			panel.style.maxHeight = null;
		} else {
			arrow.innerHTML = '<i class="fas fa-chevron-up"></i>';
			// panel.style.display = "inline";
			// panel.style.maxHeight = panel.scrollHeight + "px";
			// panel.style.paddingBottom = "1rem";
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
		const status = !this.state.open;
		this.setState({ open: status, panel: panel })
	}
	clicked = (symbol) => {
		console.log("clicked");
		if (!this.props.prices[symbol]) return null;
		if (this.props.editing) {
			return this.props.remove(symbol);
		}
		else {
			return this.props.activate(symbol);
		}
	}
	toggleChange = (e) => {
		const changevalues = e.currentTarget.parentElement.parentElement.children;
		for (let i = 0; i < changevalues.length; i++) {
			let changevalue = changevalues[i].lastChild.lastChild.lastChild;
			changevalue.classList.remove(classes.changevalue);
			void changevalue.offsetWidth; // trigger reflow
			changevalue.classList.add(classes.changevalue);
		}
		const percent = !this.state.percent;
		return this.setState({ percent: percent })
	}
	componentDidUpdate = () => {
		if (this.state.open) {
			const panel = this.state.panel;
			if (panel.style.maxHeight !== (panel.scrollHeight + "px")) {
				panel.style.maxHeight = panel.scrollHeight + "px";
				this.setState({ panel: panel });
			}
		}
	}
	render = () => {
		// const height = this.state.open ? "100%" : null;
		let list = [];
		this.props.orders.forEach(order => {
			console.log("here", this.props.companies[order.symbol], this.props.prices);
			let change = this.props.prices[order.symbol] ? (order.buy ? (this.props.prices[order.symbol].price - order.avgFillPrice) : (order.avgFillPrice - this.props.prices[order.symbol].price)) : null;
			const changeClasses = classes.change + " " + (change > 0 ? classes.green : classes.red);
			list.push(
				<Listitem link={order.symbol} key={order.symbol} editing={this.props.editing} >{/*clicked={() => this.clicked(symbol)} >*/}
					<div className={classes.order} onClick={() => this.clicked(order.symbol)}>
						<div className={classes.left}>
							<Logo centered symbol={order.symbol}></Logo>
							<div>
								{order.symbol}
							</div>
							{/* <sub>
								{this.props.companies[order.symbol] ? this.props.companies[order.symbol] : order.symbol}
							</sub> */}
						</div>

						<div className={classes.center}>
							<div className={classes.centeritem}>
								{order.type.toUpperCase()}
							</div>
							<div className={classes.centeritem}>
								{order.buy ? "BUY" : "SELL"}
							</div>
						</div>
						<div className={classes.right}>
							<span>
								{order.qty}
							</span>
							at
							<span>
								{order.type.includes('market') ? "MARKET" : "$" + order.price}
							</span>
						</div>
						{order.type.includes('stop') ? (<div className={classes.farright} onClick={this.toggleChange}>
							<span>
								ACTIVE
						</span>
							<span>
								After
						</span>
							<span>
								${order.trigger}
							</span>
						</div>) : null}
					</div>
				</Listitem >
			)
		});
		return (<div className={classes.list} >
			<div className={classes.item}>
				<div className={classes.heading} onClick={this.toggleDropdown} id="Order">
					<Heading>Orders</Heading>
					<Heading className={classes.arrow}>
						<i className="fas fa-chevron-down"></i>
					</Heading>
				</div>
			</div>
			<div className={classes.panel} >
				<div className={classes.container}>
					<div>
						{list.length ? list : <Heading className=" paddingY center"> No Positions </Heading>}
					</div>
				</div>
			</div>
		</div>)
	}
}

export default Order;