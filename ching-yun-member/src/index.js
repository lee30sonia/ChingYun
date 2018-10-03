import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './popup.css';
import App from './App';
import Popup from 'react-popup';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App classes={{root:"root"}}/>, document.getElementById('root'));
ReactDOM.render(<Popup classes={{root:"root"}} />, document.getElementById('popup'));
//registerServiceWorker();
