import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classes from './Orders.module.css'
import Heading from '../../../components/UI/Heading/Heading';
import Logo from '../../../components/UI/Logo/Logo';
import Button from '../../../components/UI/Button/Button';
import Listitem from '../../../components/List/Listitem/Listitem';
class Portfolio extends Component {
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
	clicked = (id) => {
		console.log("clicked");
		if (this.props.editing) {
			return this.props.remove(id);
		}
		else {
			return this.props.delete(id);
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
				<tr className={classes.order} onClick={() => this.clicked(order._id)}>
					<td>{order.symbol}</td>
					<td>{order.type.toUpperCase()}</td>
					<td>{order.buy ? "BUY" : "SELL"}</td>
					<td>{order.qty}</td>
					{order.type.includes('market') ? <td>MARKET</td> : <td>${this.props.numberWithCommas(order.price)}</td>}
					{order.type.includes('stop') ? (<td>ACTIVE AFTER ${this.props.numberWithCommas(order.trigger)}</td>) : <td>ACTIVE</td>}
				</tr>
			)
		});
		return (<div className={classes.list} >
			<div className={classes.item}>
				<div className={classes.heading} onClick={this.toggleDropdown} id="Portfolio">
					<Heading>Orders</Heading>
					<Heading className={classes.arrow}>
						<i className="fas fa-chevron-down"></i>
					</Heading>
				</div>
			</div>
			<div className={classes.panel} >
				<div className={classes.container}>
					{list.length ?
						(
							<table>
								<thead>
									<tr>
										<th>SYMBOL</th>
										<th>TYPE</th>
										<th>SIDE</th>
										<th>QTY</th>
										<th>PRICE</th>
										<th>STATUS</th>
									</tr>
								</thead>
								<tbody>
									{list}
								</tbody>
							</table>
						)
						: (<Heading className=" paddingY center"> No Orders </Heading>)}
				</div>
			</div>
		</div>)
	}
}

export default Portfolio;