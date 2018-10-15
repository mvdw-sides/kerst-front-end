import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { Route, BrowserRouter } from "react-router-dom";

ReactDOM.render((
    <div>
        <BrowserRouter>
            <Route path="/" render={ props => <App {...props} base="https://vdweem-kerst-api.herokuapp.com"/>} public />
        </BrowserRouter>
    </div>
), document.getElementById('root'));
