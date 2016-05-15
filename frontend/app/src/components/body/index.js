import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from '../welcome'
import Resume from '../resume'
import ProjectsShowcase from '../showcase'
import ProjectsList from '../projects'
import Photos from '../photos'

import './style.scss';

export default class Body extends React.Component {

    render() {
        return (
            <div className="body">
                <Welcome />
                <Resume />
                <section className="add-padding">
                    <ProjectsShowcase />
                </section>
                <section className="add-padding">
                    <ProjectsList />
                </section>
                <section className="add-padding">
                    <Photos />
                </section>
            </div>
        )
    }
};
