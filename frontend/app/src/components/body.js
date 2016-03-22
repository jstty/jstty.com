import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome'

export default class Body extends React.Component {

    render() {
        return (
            <div>
                <Welcome />
                <Welcome />
                <Welcome />
            </div>
        )
    }
};
