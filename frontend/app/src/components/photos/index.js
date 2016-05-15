import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import backGroundImage from '../../../backgrounds/descent2.jpg';
import './style.scss';

export default class Photos extends React.Component {

    render() {
        return (
            <ScrollElement name="photos" className="photos">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <h1>Photos</h1>
                </Parallax>
                <div className="body">
                    <p>Coming Soon...</p>
                </div>
            </ScrollElement>
        )
    }
};
