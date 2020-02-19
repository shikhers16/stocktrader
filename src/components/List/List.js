import React, { Component } from 'react';

import classes from './List.module.css'

import Heading from '../UI/Heading/Heading';
import Logo from '../UI/Logo/Logo';
import Button from '../UI/Button/Button';
import Input from '../../containers/Inputs/Input';
import Listitem from '../../components/List/Listitem/Listitem';

class List extends Component {
	state = {
		open: false,
		panel: null,
		percent: false,
		slide: false
	}
	toggleDropdown = (x) => {
		//console.log(this.state.panel);
		x.currentTarget.classList.toggle(classes.active);
		let arrow = x.currentTarget.lastChild;
		let panel = x.currentTarget.parentElement.nextElementSibling;
		//console.log(panel.style.display);
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
	clicked = (symbol) => {
		//console.log("clicked");
		if (this.props.editing) {
			return this.props.remove(symbol);
		}
		else {
			if (!this.props.prices[symbol]) return null;
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
		let list = [];
		this.props.listitems.forEach(symbol => {
			const changeClasses = classes.change + " " + (this.props.prices[symbol] ? (this.props.prices[symbol].change > 0 ? classes.green : classes.red) : null);
			list.push(
				<Listitem link={symbol} key={symbol} editing={this.props.editing} >
					<div className={classes.left} onClick={() => this.clicked(symbol)} >
						<Logo centered symbol={symbol}></Logo>
						<div>
							<div>
								{symbol}
							</div>
							<sub>
								{this.props.companies[symbol] ? this.props.companies[symbol] : symbol}
							</sub>
						</div>
					</div>
					<div className={classes.right} onClick={this.toggleChange}>
						<div style={{ fontSize: "1.2rem" }}>
							${this.props.prices[symbol] ? this.props.numberWithCommas(this.props.prices[symbol].price) : null}
						</div>
						<sub className={changeClasses} >
							<span className={classes.changevalue}>
								{this.props.prices[symbol] ? (this.state.percent ? (this.props.numberWithCommas((this.props.prices[symbol].changePercent * 100).toFixed(2)) + "%") : (this.props.numberWithCommas(this.props.prices[symbol].change) + " $")) : null}
							</span>
						</sub>
					</div>
				</Listitem>
			)
		});
		return (<div className={classes.list}>
			<div className={classes.item}>
				<div className={classes.heading} onClick={this.toggleDropdown} id={this.props.heading}>
					<Heading>{this.props.heading}</Heading>
					<Heading className={classes.arrow}>
						<i className="fas fa-chevron-down"></i>
					</Heading>
				</div>
				<button className={classes.delete} onClick={this.props.delete} >
					<Heading className={classes.arrow}>
						<i className="fas fa-trash"></i>
					</Heading>
					<span className={classes.tooltiptext}>Delete Watchlist</span>
					<span></span>
				</button>
			</div>
			<div className={classes.panel} >
				<div className={classes.container}>
					<div>
						{list.length ? list : <Heading className=" paddingY center"> No Stocks Added</Heading>}
					</div>
					<div>
						{this.props.editing ? (<Listitem className={classes.padding}>
							<Input value={this.props.value} update={this.props.update} name="symbol" add={(symbol) => this.props.add(symbol)} placeholder="Enter a US Stock symbol" />
						</Listitem>) : null}
					</div>
					{this.props.editing ?
						(
							<div className={classes.button}>
								<Button onclick={this.props.save} color="yellow" >Save</Button>
								<Button color="red" onclick={this.props.cancel}>Cancel</Button>
							</div>
						)
						:
						(<div className={classes.button}>
							<Button onclick={this.props.edit} color="yellow" >{list.length ? "Edit" : "Add"}</Button>
						</div>)
					}
				</div>
			</div>
		</div>)
	}
}

export default List;