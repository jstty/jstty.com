import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import backGroundImage from '../../../backgrounds/eye_of_the_beholder.jpg';
import './style.scss';

export default class Projects extends React.Component {

    render() {
        return (
            <ScrollElement name="projects" className="projects">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <h1>Projects</h1>
                </Parallax>
                <br/><br/>
                <p>Coming Soon...</p>
            </ScrollElement>
        )
    }
};
