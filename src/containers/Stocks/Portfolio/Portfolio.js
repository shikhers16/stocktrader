import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classes from './Portfolio.module.css'
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
		this.props.portfolio.list.forEach(position => {
			console.log("here", this.props.companies[position.symbol], this.props.prices);
			let change = this.props.prices[position.symbol] ? (position.buy ? (this.props.prices[position.symbol].price - position.avgFillPrice) : (position.avgFillPrice - this.props.prices[position.symbol].price)) : null;
			const changeClasses = classes.change + " " + (change > 0 ? classes.green : classes.red);
			list.push(
				<Listitem link={position.symbol} key={position.symbol} editing={this.props.editing} >{/*clicked={() => this.clicked(symbol)} >*/}
					<div className={classes.left} onClick={() => this.clicked(position.symbol)}>
						<div className={classes.left_left}>
							<Logo centered symbol={position.symbol}></Logo>
							<div>
								<div>
									{position.symbol}
								</div>
								<sub>
									{this.props.companies[position.symbol] ? this.props.companies[position.symbol] : position.symbol}
								</sub>
							</div>
						</div>
						<div className={classes.center}>
							<span>
								{this.props.numberWithCommas(position.qty)}
							</span>
							at
							<span>
								${this.props.numberWithCommas(position.avgFillPrice)}
							</span>
						</div>
					</div>
					<div className={classes.right} onClick={this.toggleChange}>
						<div style={{ fontSize: "1.2rem" }}>
							${this.props.prices[position.symbol] ? this.props.numberWithCommas(this.props.prices[position.symbol].price) : null}
						</div>
						<sub className={changeClasses} >
							<span className={classes.changevalue}>
								{/* //$ vs % {change ? (this.state.percent ? (((change * 100) / position.avgFillPrice).toFixed(2) + "%") : (change.toFixed(2) + " $")) : null} */}
								{/* //$ vs total {change ? (this.state.percent ? ((change * Math.abs(position.qty)).toFixed(2) + "$") : (change.toFixed(2) + " $")) : null} */}
								{/* total vs % vs */change ? (this.state.percent ? (this.props.numberWithCommas(((change * 100) / (position.avgFillPrice)).toFixed(2)) + "%") : (this.props.numberWithCommas((change * Math.abs(position.qty)).toFixed(2)) + "$")) : null}
							</span>
						</sub>
					</div>
				</Listitem>
			)
		});
		return (<div className={classes.list} >
			<div className={classes.item}>
				<div className={classes.heading} onClick={this.toggleDropdown} id="Portfolio">
					<Heading>Portfolio</Heading>
					<Heading>${this.props.numberWithCommas(this.props.portfolio.total.toFixed(2))}</Heading>
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

export default Portfolio;