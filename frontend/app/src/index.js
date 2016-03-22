import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import 'font-awesome/scss/font-awesome.scss';
import 'materialize-css/sass/materialize.scss'

import Store from './reducers';
import App from './app';

let store = createStore(Store);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);