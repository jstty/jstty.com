import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from '../welcome'
import Resume from '../resume'
import Portfolio from '../portfolio'
import Projects from '../projects'
import Photos from '../photos'

import './style.scss';

export default class Body extends React.Component {

    /*
     <section className="add-padding">
     <Portfolio />
     </section>
     */
    render() {
        return (
            <div className="body">
                <Welcome />
                <Resume />

                <section className="add-padding">
                    <Projects />
                </section>
                <section className="add-padding">
                    <Photos />
                </section>
            </div>
        )
    }
};
