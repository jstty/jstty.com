import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import backGroundImage from '../../../backgrounds/eye_of_the_beholder.jpg';
import './style.scss';

export default class Projects extends React.Component {

    constructor (){
        super();
        this.url = 'http://localhost:8000/api/projects';
    }

    componentDidMount() {
        this.setState( { data: {} } );

        $.ajax({
            url: this.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.url, status, err.toString());
            }.bind(this)
        });
    }

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
