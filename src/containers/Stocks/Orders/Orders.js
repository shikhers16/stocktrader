import React, { Component } from 'react';

import classes from './Orders.module.css'

import Heading from '../../../components/UI/Heading/Heading';

class Portfolio extends Component {
	state = {
		open: false,
		panel: null,
		slide: false
	}
	toggleDropdown = (x) => {
		x.currentTarget.classList.toggle(classes.active);
		let arrow = x.currentTarget.lastChild;
		let panel = x.currentTarget.parentElement.nextElementSibling;
		if (panel.style.maxHeight) {
			arrow.innerHTML = '<i class="fas fa-chevron-down"></i>';
			panel.style.maxHeight = null;
		} else {
			arrow.innerHTML = '<i class="fas fa-chevron-up"></i>';
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
		const status = !this.state.open;
		this.setState({ open: status, panel: panel })
	}
	clicked = (id) => {
		return this.props.delete(id);
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
		let list = [];
		this.props.orders.forEach(order => {
			list.push(
				<tr className={classes.order} onClick={() => this.clicked(order._id)} key={order._id}>
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