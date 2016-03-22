import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import './style.scss';

export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => {
        console.log('handleToggle:', this.state.open);
        this.setState( { open: !this.state.open } );
    }

    downloadResume = () => {
        fetch('http://localhost:8000/api/resume')
            .catch((error) => {
                    console.warn(error);
            });
    }

    render() {
        return (
            <div className="nav-bar">
                <nav role="navigation">
                    <div className="nav-wrapper ">
                        <ul className="left hide-on-med-and-down">
                            <li><a onClick={this.handleToggle}><i className="fa fa-angle-right fa-2x"></i></a></li>
                        </ul>


                        <ul className="right hide-on-med-and-down">
                            <li><a target="_blank" href="https://github.com/jstty"><i className="fa fa-github-square fa-2x"></i></a></li>
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            <li><a target="_blank" href="https://www.linkedin.com/in/joseph-sutton-5195677"><i className="fa fa-linkedin-square fa-2x"></i></a></li>
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            <li><a target="_blank" href="http://localhost:8000/api/resume"><i className="fa fa-file-pdf-o fa-2x"></i></a></li>
                        </ul>

                        <ul id="nav-mobile" className="side-nav">
                            <li><a onClick={this.handleToggle}><i className="fa fa-angle-right fa-1x"></i></a></li>
                        </ul>
                    </div>
                    <LeftNav open={this.state.open}>
                        <MenuItem onClick={this.handleToggle}
                                  primaryText="Close"
                                  className="menu-item"
                                  leftIcon={<i className="fa fa-angle-left"></i>}></MenuItem>
                        <MenuItem primaryText="Resume" className="menu-item" leftIcon={<i className="fa fa-file-text-o"></i>}></MenuItem>
                        <MenuItem primaryText="Projects" className="menu-item" leftIcon={<i className="fa fa-code"></i>}></MenuItem>
                        <MenuItem primaryText="Photos" className="menu-item" leftIcon={<i className="fa fa-file-image-o"></i>}></MenuItem>
                    </LeftNav>
                </nav>
                <p>_</p>
            </div>
        );
    }
}
