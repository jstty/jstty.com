import React from 'react';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import $ from 'jquery';
import LinearProgress from 'material-ui/lib/linear-progress';

import GalleryTree from './galleryTree';
//import PhotoTreeMap from './treemapSimple';
//import PhotoTreeMap from './treemap';
//import PhotoTreeMap from './treemap2';

import backGroundImage from '../../../backgrounds/descent2.jpg';
import './style.scss';

export default class Photos extends React.Component {

    constructor() {
        super();
        this.url = '/api/photos/tree';
        this.state = {
            ready: false,
            tree: null
        };
    }

    componentDidMount() {
        $.ajax({
            url: this.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                data.tree = {
                    '2006': data.tree['2006']
                };

                this.setState({
                    ready: true,
                    data: data
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
                                <GalleryTree data={this.state.data} />
                            </div>
                        </div>
                    </section>
                </div>
            </ScrollElement>
        )
    }
};
