import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import backGroundImage from '../../../backgrounds/fallen.jpg';
import './style.scss';

export default class Portfolio extends React.Component {

    render() {
        return (
            <ScrollElement name="portfolio" className="portfolio">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <h1>Portfolio</h1>
                </Parallax>
                <br/><br/>
                <p>Coming Soon...</p>
            </ScrollElement>
        )
    }
};
