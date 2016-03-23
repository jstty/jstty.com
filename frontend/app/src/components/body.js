import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './welcome'
import Resume from './resume'
import Portfolio from './portfolio'
import Projects from './projects'
import Photos from './photos'

export default class Body extends React.Component {

    render() {
        return (
            <div>
                <Welcome />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <Resume />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <Portfolio />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <Projects />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <Photos />
            </div>
        )
    }
};
