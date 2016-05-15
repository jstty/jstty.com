import React from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import SlideColumnList from '../slideColumnList';

import backGroundImage from '../../../backgrounds/fallen.jpg';
import './style.scss';

var columns = [
    {
        header: "1",
        items: [
            {
                id: 1,
                name: "Photos",
                desc: "Jan 9, 2014"
            },
            {
                id: 2,
                name: "Recipes",
                desc: "Jan 17, 2014"
            },
            {
                id: 3,
                name: "Work",
                desc: "Jan 28, 2014"
            }
        ]
    },
    {
        header: "2",
        items: [
            {
                id: 1,
                name: "Photos",
                desc: "Jan 9, 2014"
            },
            {
                id: 2,
                name: "Work",
                desc: "Jan 28, 2014"
            }
        ]
    },
    {
        header: "3",
        items: [
            {
                id: 1,
                name: "Recipes",
                desc: "Jan 17, 2014"
            },
            {
                id: 2,
                name: "Work",
                desc: "Jan 28, 2014"
            }
        ]
    },
    {
        header: "4",
        items: [
            {
                id: 1,
                name: "Work",
                desc: "Jan 28, 2014"
            }
        ]
    },
    {
        header: "5",
        items: [
            {
                id: 1,
                name: "Photos",
                desc: "Jan 9, 2014"
            }
        ]
    },
    {
        header: "1",
        items: [
            {
                id: 1,
                name: "Photos",
                desc: "Jan 9, 2014"
            },
            {
                id: 2,
                name: "Recipes",
                desc: "Jan 17, 2014"
            },
            {
                id: 3,
                name: "Work",
                desc: "Jan 28, 2014"
            }
        ]
    },
    {
        header: "2",
        items: [
            {
                id: 1,
                name: "Photos",
                desc: "Jan 9, 2014"
            },
            {
                id: 2,
                name: "Work",
                desc: "Jan 28, 2014"
            }
        ]
    }
];

// <SlideColumnList columns={columns}/>

export default class ProjectsList extends React.Component {

    render() {
        return (
            <ScrollElement name="projects" className="projects-all">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <h1>All Projects</h1>
                </Parallax>
                <div className="body">
                    <p>Coming Soon...</p>
                </div>
            </ScrollElement>
        )
    }
};
