import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import Spark from 'react-spark-scroll-gsap';
var {SparkScroll, SparkProxy, sparkScrollFactory} = Spark({ invalidateAutomatically: true });


import backGroundImage from '../../../backgrounds/engulfed.jpg';
import './style.scss';

export default class Welcome extends React.Component {

    render() {
        return (
            <ScrollElement name="welcome" className="welcome">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <div>
                        <SparkScroll.h2
                            timeline={{
                                ease:'easeOutQuad',
                                0:   {opacity:'1'},
                                200: {opacity:'0'}
                            }}
                        >Another visitor...</SparkScroll.h2>
                        <SparkScroll.h2 className="initHidden"
                            timeline={{
                                ease:'easeOutQuad',
                                0: {opacity:'0'},
                                50: {opacity:'0'},
                                100: {opacity:'0'},
                                300: {opacity:'1'},
                                400: {opacity:'0'}
                            }}
                        >Stay awhile</SparkScroll.h2>
                        <SparkScroll.h2 className="initHidden"
                            timeline={{
                                ease:'easeOutQuad',
                                400: {opacity:'0'},
                                500: {opacity:'1'}
                            }}
                        >Stay forever!</SparkScroll.h2>
                    </div>

                </Parallax>
            </ScrollElement>
        )
    }
};
