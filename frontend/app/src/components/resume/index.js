import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import backGroundImage from '../../../backgrounds/edge_of_the_world_2.jpg';
import './style.scss';

export default class Resume extends React.Component {

    render() {
        return (
            <ScrollElement name="resume" className="resume">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <h1>Resume</h1>
                </Parallax>

                <p>Coming Soon...</p>
            </ScrollElement>
        )
    }
};
