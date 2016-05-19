import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

//import PhotoTreeMap from './treemapSimple';
import PhotoTreeMap from './treemap';
//import PhotoTreeMap from './treemap2';

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
                    <PhotoTreeMap />
                    <p>Coming Soon...</p>
                </div>
            </ScrollElement>
        )
    }
};
