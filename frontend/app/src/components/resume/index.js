import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import SingleIcon from 'material-ui/lib/svg-icons/image/center-focus-strong';
import MultiIcon from 'material-ui/lib/svg-icons/image/blur-on';

import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import Scroll from 'react-scroll';
var ScrollElement = Scroll.Element;

import backGroundImage from '../../../backgrounds/edge_of_the_world_2.jpg';
import './style.scss';

export default class Resume extends React.Component {

    render() {
        return (
            <ScrollElement name="resume" className="resume">
                <Parallax bgImage={backGroundImage} strength={300}>
                    <h1>R&eacute;sum&eacute;</h1>
                </Parallax>

                <div className="row">
                    <div className="col s12 m5 center offset-m1">
                        <SingleIcon className="icon"/>
                        <section>
                            <h3>Single Page</h3>
                            <p>Latest and greatest work summarized to fit on one amazingly beautiful page, but still jam packed full of awesomeness!!
                                <div className="hide-on-small-and-down"><br/></div>
                            </p>
                        </section>
                        <RaisedButton className="link" label="Download" primary={true} href="/api/resume/showcase" target="_blank" linkButton={true} />
                    </div>
                    <div className="col s12 m5 center">
                        <MultiIcon className="icon"/>
                        <section>
                            <h3>Multi-Page CV</h3>
                            <p>Now with 125.7% more then ever before! <br />
                                You will see all the project/work experiace, research and publications in all it's glory<br />
                                Act now, while supplies last!! <br /></p>
                        </section>
                        <RaisedButton className="link" label="Download" disabled={false} primary={true} href="/api/resume/full" target="_blank" linkButton={true} />
                    </div>
                </div>
            </ScrollElement>
        )
    }
};
