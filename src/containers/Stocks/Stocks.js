import React, { Component, Fragment } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

import classes from './Stocks.module.css';

import Portfolio from './Portfolio/Portfolio';
import Orders from './Orders/Orders';
import List from '../../components/List/List';
import Accordian from '../../components/UI/Accordian/Accordian';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../Inputs/Input';
import Heading from '../../components/UI/Heading/Heading';

class Stocks extends Component {
	state = {
		watchlists: [],
		portfolio: { total: 0, list: [] },
		orders: [],
		companies: {},
		prices: {},
		name: "",
		value: "",
		new: false,
		add: [],
		remove: [],
		newModal: false,
		addModal: false,
		deleteModal: false,
		orderID: null,
		_id: null
	}
	uniqueArray = (array) => {
		var a = array.concat();
		for (var i = 0; i < a.length; ++i) {
			for (var j = i + 1; j < a.length; ++j) {
				if (a[i] === a[j])
					a.splice(j--, 1);
			}
		}
		return a;
	}
	toggleslide = () => {
		let acc = document.getElementsByClassName("accordion");
		let i;
		for (i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function () {
				this.classList.toggle("active");
				let panel = this.nextElementSibling;
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		}
	}
	openModal = (method, _id) => {
		console.log(method, _id);
		let modalState = {};
		switch (method) {
			case "new":
				modalState = { newModal: true, name: "", value: "", new: true };
				window.scrollTo(0, 0);
				break;
			case "edit":
				modalState = { _id: _id }
				break;
			case "delete":
				modalState = { deleteModal: true, _id: _id };
				window.scrollTo(0, 0);
				break;
			case "delete order":
				modalState = { deleteModal: true, orderID: _id };
				window.scrollTo(0, 0);
				break;
			default:
				console.log("default");
				break;
		}
		return this.setState(modalState);
	}
	closeModal = (e) => {
		this.setState({ newModal: false, deleteModal: false, addModal: false, _id: null, orderID: null, add: [], remove: [], new: false })
	}
	getPortfolio = () => {
		const userid = localStorage.getItem('userid');
		axios.get(`/user/portfolio/?user=${userid}`)
			.then(response => {
				console.log(response.data);
				if (response.data._id) {
					const symbols = response.data.portfolio.list.map(item => item.symbol);
					console.log(symbols);
					if (symbols.length) this.getData([{ list: symbols }]);
					this.setState({ portfolio: response.data.portfolio });
				}
			})
			.catch(error => {
				console.log(error.request);
			});
	}
	getOrders = () => {
		const userid = localStorage.getItem('userid');
		axios.get(`/user/orders/?user=${userid}`)
			.then(response => {
				console.log('orders', response.data);
				if (response.data) {
					const symbols = response.data.map(item => item.symbol);
					console.log(symbols);
					this.setState({ orders: response.data });
				}
			})
			.catch(error => {
				console.log(error.request);
			});
	}
	addWatchlist = () => {
		axios.post('/user/watchlist/new/', { name: this.state.name })
			.then(response => {
				// console.log(response.data);
				if (response.data.message === "Success") {
					const newWatchlists = [...this.state.watchlists];
					newWatchlists.push(response.data.watchlist);
					this.setState({ watchlists: newWatchlists });
					return this.closeModal();
				}
			})
			.catch(error => {
				console.log(error.request);
				return this.closeModal();
			});
	}
	edit = () => {
		axios.put('/user/watchlist/edit/', {
			add: this.state.add.join(','),
			remove: this.state.remove.join(','),
			_id: this.state._id
		})
			.then(response => {
				// console.log(response.data);
				if (response.data.message === "Success") {
					const newWatchlists = [...this.state.watchlists];
					const index = this.state.watchlists.findIndex(watchlist => watchlist._id === this.state._id);
					newWatchlists.splice(index, 1, response.data.watchlist);
					// newWatchlists.push(response.data.watchlist)
					this.setState({ watchlists: newWatchlists, add: [], remove: [], _id: null });
					this.getData(newWatchlists);
					return this.closeModal();
				}
			})
			.catch(error => {
				console.log(error.request);
				return this.closeModal();
			});
	}
	delete = (item) => {
		let _id = null;
		switch (item) {
			case 'watchlist':
				_id = this.state._id;
				axios.delete('/user/watchlist/delete', { data: { "_id": _id } })
					.then(response => {
						if (response.data.message === "Success") {
							let newWatchlists = [...this.state.watchlists];
							const index = this.state.watchlists.findIndex(watchlist => watchlist._id === _id);
							newWatchlists.splice(index, 1);
							this.setState({ watchlists: newWatchlists });
							return this.closeModal();
						}
					})
					.catch(error => {
						console.log(error.request);
						return this.closeModal();
					});
				break;
			case 'order':
				console.log('order delete', this.state.orderID);
				_id = this.state.orderID;
				axios.delete('/user/order', { data: { "_id": _id } })
					.then(response => {
						if (response.data.message === "Success") {
							let newOrders = [...this.state.orders];
							const index = this.state.orders.findIndex(order => order._id === _id);
							newOrders.splice(index, 1);
							this.setState({ orders: newOrders });
							return this.closeModal();
						}
					})
					.catch(error => {
						console.log(error.request);
						return this.closeModal();
					});
				break;
			default:
				break;
		}

	}
	add = (symbol) => {
		console.log(symbol);
		if (symbol) {
			const plus = [...this.state.add];
			plus.push(symbol.toUpperCase());
			return this.setState({ add: plus });
		}
	}
	remove = (_id, symbol) => {
		console.log(_id, symbol);
		if (this.state.add.includes(symbol)) {
			const plus = this.state.add.filter(stock => stock !== symbol);
			return this.setState({ add: plus });
		}
		else {
			const minus = [...this.state.remove];
			minus.push(symbol);
			this.setState({ remove: minus })
		}
	}
	update = (type, name, value) => {
		console.log(type, name, value);
		const index = this.state.watchlists.findIndex(watchlist => watchlist.name === name);
		console.log(name, value, index);
		if (index > -1) {
			const newWatchlists = [...this.state.watchlists];
			newWatchlists[index].list.push(value);
			return this.setState({ watchlists: newWatchlists });
		}
		else {
			if (name === "name") return this.setState({ name: value });
		}
	}
	getWatchlists = () => {
		axios.get("/user/watchlists")
			.then(response => {
				console.log(response.data);
				const watchlists = response.data.watchlists;
				if (Object.keys(watchlists).length) this.getData(watchlists);
				return this.setState({ watchlists: watchlists });
			})
			.catch(error => {
				console.log(error.request);
			});
	}
	getData = (watchlists) => {
		console.log(watchlists);
		let symbols = [];
		watchlists.forEach(watchlist => {
			symbols = this.uniqueArray(symbols.concat(watchlist.list));
		});
		symbols = symbols.filter(symbol => !Object.keys(this.state.companies).includes(symbol));
		console.log("getdata", symbols);
		if (!symbols.length) return null;
		axios.post('/stock/batch', { symbols: symbols, points: ["quote"] })
			.then(response => {
				console.log("quote", response.data);
				const companies = { ...this.state.companies };
				const prices = { ...this.state.prices };
				for (let symbol in response.data) {
					companies[symbol] = response.data[symbol].companyName;
					delete response.data[symbol].companyName;
					prices[symbol] = response.data[symbol];
				}
				console.log(companies);
				console.log(prices);
				return this.setState({ companies: companies, prices: prices });
			})
	}
	activateStock = (symbol) => {
		console.log(symbol);
		window.scrollTo(0, 0);
		// this.setState({ active: symbol });
		const company = this.state.companies[symbol]
		const prices = this.state.prices[symbol]
		this.props.activate(symbol, company, prices);
	}
	transaction = (data) => {
		axios.post('/transaction/', data)
			.then(response => {
				console.log(response.data);
				if (response.data._id) this.closeModal();
			})
			.catch(error => {
				console.log(error.request);
			});
	}
	componentDidMount = () => {
		this.toggleslide();
		this.getPortfolio();
		this.getOrders();
		this.getWatchlists();
		const socket = openSocket('http://localhost:8080');
		socket.emit('join', { id: localStorage.getItem('userid') });
		socket.on('transaction', data => {
			this.getPortfolio();
			this.getOrders();
		});
		socket.on('order', data => {
			console.log(data);
			this.getWatchlists();
			this.getOrders();
		});
		socket.on('watchlist', data => {
			console.log(data);
			this.getWatchlists();
		});

	}
	render = () => {
		const lists = [];
		this.state.watchlists.forEach(watchlist => {
			const edit = watchlist._id === this.state._id;
			console.log(watchlist._id, this.state._id, edit);
			let list = watchlist.list;
			if (edit) {
				// list = [...watchlist.list, ...this.state.add];
				// console.log("list", list);
				list = this.uniqueArray(watchlist.list.concat(this.state.add))
				list = list.filter(x => !this.state.remove.includes(x));
			}
			lists.push(<List
				key={watchlist._id}
				listitems={list}
				companies={this.state.companies}
				prices={this.state.prices}
				heading={watchlist.name}
				update={this.update}
				value={this.state.value}
				editing={edit}
				activate={(symbol) => this.activateStock(symbol)}
				// add={() => this.openModal("add", watchlist._id)}
				add={(symbol) => this.add(symbol)}
				edit={() => this.openModal("edit", watchlist._id)}
				remove={(symbol) => this.remove(watchlist._id, symbol)}
				save={this.edit}
				cancel={this.closeModal}
				delete={() => this.openModal("delete", watchlist._id)}
				numberWithCommas={this.props.numberWithCommas}
			/>)
		});
		// console.log(lists);
		return (
			<div className={classes.stocks}>
				<Accordian>
					<div className="marginY">
						<Button onclick={() => this.openModal("new")} >New Watchlist</Button>
					</div>
					<Modal show={this.state.newModal} clicked={this.closeModal}>
						<div>
							<Heading>New Watchlist</Heading>
						</div>
						<div>
							{/* <Form value={this.state.value} update={this.update} details={{ normal: { "name": "" } }} /> */}
							{this.state.new ? <Input value={this.state.value} update={this.update} name="name" disabled={this.state.value} /> : null}
						</div>
						<div>
							<Button onclick={this.addWatchlist} color="green">Add</Button>
							<Button onclick={this.closeModal} color="red">Cancel</Button>
						</div>
					</Modal>
					<Modal show={this.state.deleteModal} clicked={this.closeModal}>
						<div>
							{/* <Form value={this.state.value} update={this.update} details={{ normal: { "name": "" } }} /> */}
							Are you sure you wnt to delete this {this.state.orderID ? "order" : "watchlist"}?
						</div>
						<div>
							{this.state.orderID ? (<Button onclick={() => this.delete('order')} color="red">Delete</Button>) :
								(<Button onclick={() => this.delete('watchlist')} color="red">Delete</Button>)}
							<Button onclick={this.closeModal} color="yellow">Cancel</Button>
						</div>
					</Modal>
					{(this.state.portfolio && this.state.prices) ? (<Portfolio
						portfolio={this.state.portfolio}
						companies={this.state.companies}
						prices={this.state.prices}
						activate={(symbol) => this.activateStock(symbol)}
						numberWithCommas={this.props.numberWithCommas}
					></Portfolio>) : null}
					{(this.state.orders && this.state.prices) ? (<Orders
						orders={this.state.orders}
						companies={this.state.companies}
						prices={this.state.prices}
						delete={(orderID) => this.openModal('delete order', orderID)}
						numberWithCommas={this.props.numberWithCommas}
					></Orders>) : null}
					{lists}
				</Accordian >
				{/* {this.state.active ? <Route path="/" render={(props) => <Details {...props} symbol={this.state.active} company={this.state.companies[this.state.active]} prices={this.state.prices[this.state.active]} />}></Route> : null} */}
				{/* {this.state.active ? <Details symbol={this.state.active} company={this.state.companies[this.state.active]} prices={this.state.prices[this.state.active]} /> : null} */}
			</div>
		);
	}
}
export default Stocks;