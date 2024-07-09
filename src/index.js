import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import products from './reducers/index'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
const store=createStore(products)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>

        <App />
    </Provider>
);

