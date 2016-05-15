import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

import Scroll from 'react-scroll';
var ScrollLink = Scroll.Link;

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

    render() {
        return (
            <div className="nav-bar">
                <nav role="navigation">
                    <div className="nav-wrapper nav-icons">
                        <ul className="left">
                            <li><a onClick={this.handleToggle}><i className="fa fa-angle-right fa-2x"></i></a></li>
                        </ul>

                        <ul className="right">
                            <li>
                                <IconButton tooltip="Github" href="https://github.com/jstty" target="_blank" tooltipPosition="bottom-left" linkButton={true}>
                                    <FontIcon className="fa fa-github-square fa-2x" />
                                </IconButton>
                            </li>
                        </ul>
                        <ul className="right">
                            <li>
                                <IconButton tooltip="LinkedIn" href="https://www.linkedin.com/in/joseph-sutton-5195677" target="_blank" tooltipPosition="bottom-left" linkButton={true}>
                                    <FontIcon className="fa fa-linkedin-square fa-2x" />
                                </IconButton>
                            </li>
                        </ul>
                        <ul className="right">
                            <li>
                                <IconButton tooltip="Resume" href="/api/resume/showcase" target="_blank" tooltipPosition="bottom-left" linkButton={true}>
                                    <FontIcon className="fa fa-file-pdf-o fa-2x" />
                                </IconButton>
                            </li>
                        </ul>

                        <ul id="nav-mobile" className="side-nav">
                            <li><a onClick={this.handleToggle}><i className="fa fa-angle-right fa-1x"></i></a></li>
                        </ul>
                    </div>

                    <LeftNav open={this.state.open} className="nav-menu">
                        <MenuItem onClick={this.handleToggle}
                                  primaryText="Close"
                                  className="menu-item"
                                  leftIcon={<i className="fa fa-angle-left"></i>}></MenuItem>
                        <ScrollLink onClick={this.handleToggle} activeClass="active" to="welcome" spy={true} smooth={true} duration={500}>
                            <MenuItem primaryText="Welcome" className="menu-item" leftIcon={<i className="fa fa-home"></i>}></MenuItem>
                        </ScrollLink>
                        <ScrollLink onClick={this.handleToggle} activeClass="active" to="resume" spy={true} smooth={true} duration={500}>
                            <MenuItem primaryText="R&eacute;sum&eacute;" className="menu-item" leftIcon={<i className="fa fa-file-text-o"></i>}></MenuItem>
                        </ScrollLink>
                        <ScrollLink onClick={this.handleToggle} activeClass="active" to="showcase" spy={true} smooth={true} duration={500}>
                            <MenuItem primaryText="Showcase" className="menu-item" leftIcon={<i className="fa fa-newspaper-o"></i>}></MenuItem>
                        </ScrollLink>
                        <ScrollLink onClick={this.handleToggle} activeClass="active" to="projects" spy={true} smooth={true} duration={500}>
                            <MenuItem primaryText="Projects" className="menu-item" leftIcon={<i className="fa fa-code"></i>}></MenuItem>
                        </ScrollLink>
                        <ScrollLink onClick={this.handleToggle} activeClass="active" to="photos" spy={true} smooth={true} duration={500}>
                            <MenuItem primaryText="Photos" className="menu-item" leftIcon={<i className="fa fa-photo"></i>}></MenuItem>
                        </ScrollLink>
                    </LeftNav>
                </nav>
                <p>_</p>
            </div>
        );
    }
}
