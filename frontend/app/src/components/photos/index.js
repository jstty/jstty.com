import React from 'react';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import $ from 'jquery';
import LinearProgress from 'material-ui/lib/linear-progress';

import Gallery from './gallery';
//import PhotoTreeMap from './treemapSimple';
//import PhotoTreeMap from './treemap';
//import PhotoTreeMap from './treemap2';

import backGroundImage from '../../../backgrounds/descent2.jpg';
import './style.scss';

export default class Photos extends React.Component {

    constructor() {
        super();
        this.url = '/api/photos';
        this.state = {
            ready: false,
            photos: null
        };
    }

    componentDidMount() {
        $.ajax({
            url: this.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({
                    ready: true,
                    photos: data
                });

            },
            error: (xhr, status, err) => {
                console.error(this.url, status, err.toString());
            }
        });
    }

    render() {
         /*
         <PhotoTreeMap />
         */

        return (
            <ScrollElement name="photos" className="photos">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <h1>Photos</h1>
                </Parallax>
                <div className="row body">
                    <section className="list col12 center">
                        <div className={"loadWrapper loading "+ (this.state.ready ? 'invisable' : 'visable')}>
                            <h5>Rerouting Refactor Pipeline...</h5>
                            <LinearProgress mode="indeterminate" />
                        </div>
                        <div className={"loadWrapper loaded "+ (this.state.ready ? 'visable' : 'invisable')}>
                            <div className="row">
                                <Gallery photos={this.state.photos} />
                            </div>
                        </div>
                    </section>
                </div>
            </ScrollElement>
        )
    }
};
