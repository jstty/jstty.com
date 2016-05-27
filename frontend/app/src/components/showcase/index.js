import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';

import LinearProgress from 'material-ui/lib/linear-progress';
var Carousel = require('nuka-carousel');


var ScrollElement = Scroll.Element;

import backGroundImage from '../../../backgrounds/eye_of_the_beholder.jpg';
import './style.scss';

export default class ProjectsShowcase extends React.Component {

    constructor() {
        super();
        this.url = '/api/projects/showcase';
        this.state = {
            ready: false,
            data: {}
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
                    data: data
                });

            },
            error: (xhr, status, err) => {
                console.error(this.url, status, err.toString());
            }
        });
    }

    // TODO: break this down into smaller components
    getList(ready, data) {
        if(ready && data.items) {
            var carouselDecorators = [
                {
                    component: React.createClass({
                        render() {
                            return (
                                <button
                                    className="carouselPrev"
                                    onClick={this.handleClick}>
                                    <i className="fa fa-angle-left"></i>
                                </button>
                            )
                        },
                        handleClick(e) {
                            e.preventDefault();

                            if(this.props.currentSlide === 0) {
                                // start wrap around
                                this.props.goToSlide(this.props.slideCount-1);
                            } else {
                                this.props.previousSlide();
                            }
                        }
                    }),
                    position: 'CenterLeft',
                },
                {
                    component: React.createClass({
                        render() {
                            return (
                            <button
                                className="carouselNext"
                                onClick={this.handleClick}>
                                <i className="fa fa-angle-right"></i>
                            </button>
                            )
                        },
                        handleClick(e) {
                            e.preventDefault();

                            if(this.props.currentSlide + 1 >= this.props.slideCount) {
                                // end wrap around
                                this.props.goToSlide(0);
                            } else {
                                this.props.nextSlide();
                            }
                        }
                    }),
                    position: 'CenterRight'
                }
            ];

            return data.items.map(function(item){
                if(item.links && item.links.length) {
                    let links =[];
                    links = item.links.map(function(link){
                        return (<div key={link.name} className="carouselBlock">
                            <a href={link.url} target="_blank">
                                <h4>{link.name}</h4>
                                <img height="200px" src={link.image} />
                            </a>
                        </div>);
                    });

                    //<a href={link.url} target="_blank">
                    //    <img src={link.image} />
                    //</a>

                    return (<div key={item.title} className="project col s12 m6 l3">
                            <div className="projectWrapper">
                                <h3>{item.companyName}<br/>{item.title}</h3>
                                <Carousel decorators={carouselDecorators} framePadding="0px 0px 20px 0px" cellAlign="center">{links}</Carousel>
                            </div>
                        </div>
                    );
                }
            });
        }

        return (<div></div>);
    }

    render() {
        return (
            <ScrollElement name="showcase" className="projects-showcase">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <h1>Projects Showcase</h1>
                </Parallax>
                <div className="row body">
                    <section className="list col12 center">
                        <div className={"loadWrapper loading "+ (this.state.ready ? 'invisable' : 'visable')}>
                            <h5>Compiling Internet...</h5>
                            <LinearProgress mode="indeterminate" />
                        </div>
                        <div className={"loadWrapper loaded "+ (this.state.ready ? 'visable' : 'invisable')}>
                            <div className="row">
                                {this.getList(this.state.ready, this.state.data)}
                            </div>
                        </div>
                    </section>
                </div>
            </ScrollElement>
        )
    }
};
