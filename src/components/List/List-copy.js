import React from 'react';
import classes from './List.module.css'
import Heading from '../UI/Heading/Heading';
import Logo from '../UI/Logo/Logo';
import Button from '../UI/Button/Button';
import Listitem from '../../components/List/Listitem/Listitem';
const list = (props) => {
	const something = (x) => {
		// console.log(x);
		x.currentTarget.classList.toggle(classes.active);
		let arrow = x.currentTarget.lastChild;
		// let panel = x.currentTarget.nextElementSibling;
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
	}
	let edit = props.edit;
	const clicked = (symbol) => {
		console.log("clocked");
		if (props.edit) {
			props.remove(symbol);
		}
	}
	let list = [];
	props.listitems.forEach(symbol => {
		list.push(
			<Listitem link={symbol} key={symbol} edit={props.edit} clicked={() => clicked(symbol)} >
				<div className={classes.left}>
					<Logo symbol={symbol}></Logo>
					{symbol}
				</div>
				<div>
					$123.4
					$2.14
					</div>
				{/* <button className={classes.delete} onClick={props.delete} ><i className="fas fa-times"></i></button> */}
			</Listitem>
		)
	});
	return (<div className={classes.list}>
		<div className={classes.item}>
			<div className={classes.heading} onClick={(e) => something(e)} id={props.heading}>
				<Heading>{props.heading}</Heading>
				<Heading className={classes.arrow}>
					<i className="fas fa-chevron-down"></i>
				</Heading>
			</div>
			<button className={classes.delete} onClick={props.delete} ><i className="fas fa-trash"></i></button>
		</div>
		<div className={classes.panel}>
			<div className={classes.container}>
				<div>
					{list.length ? list : <Heading className=" center"> No Stocks Added</Heading>}
				</div>
				<duv>
					{props.edit ? <input></input> : null}
				</duv>
				{props.edit ?
					(
						<div className={classes.button}>
							<Button onclick={props.save} color="yellow" >Save</Button>
							<Button color="red" onclick={props.cancel}>Cancel</Button>
						</div>
					)
					:
					(<div className={classes.button}>
						<Button onclick={props.add} color="yellow" >Add</Button>
						{list.length ? <Button onclick={props.toggleRemove} color="red" >Remove</Button> : null}
					</div>)
				}
				{/* /* <Button color="red"   >Delete</Button> */}
			</div>
		</div>
	</div>)
}

export default list;
