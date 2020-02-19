import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.29.68:8080';
axios.defaults.baseURL = 'https://www.shikhersrivastava.com/stocktradingapi';

ReactDOM.render(<BrowserRouter basename="/stock-trader/"><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
