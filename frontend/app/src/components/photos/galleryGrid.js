import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import numeral from 'numeral';

// TODO fix this
/*
 justifiedGallery is not working
 magnific-popup is not working
 no errors, nothing
 it just doesn't work
 */
// import 'justifiedGallery/dist/css/justifiedGallery.css';
//import justifiedLib from 'imports?jQuery=jquery!justifiedGallery/dist/js/jquery.justifiedGallery.js';
//import justifiedLib from 'imports?jQuery=jquery!justifiedGallery/src/js/justifiedGallery.js';
// import 'justifiedGallery/src/js/justifiedGallery.js';

//import justifiedLib from 'imports?jQuery=jquery!justifiedGallery';
//import 'justifiedGallery/src/less/justifiedGallery.less';

//import magnificLib from 'imports?jQuery=jquery!magnific-popup';
// import 'magnific-popup/dist/magnific-popup.css';
// import 'magnific-popup';


import './galleryGrid.scss';

export default class GalleryGrid extends React.Component {

    componentDidMount() {
        var $thisElm = $(ReactDOM.findDOMNode(this));
        this.init($thisElm);
    }

    componentDidUpdate() {
        var $thisElm = $(ReactDOM.findDOMNode(this));
        this.init($thisElm);
    }

    init(photoGalleryElm) {
        //console.log('$:', $);

        //var selector = '#'+this.props.id+" .photoGalleryGrid";
        //console.log('GalleryGrid selector:', selector);
        //var photoGalleryElm = $(selector);
        //console.log('$ photoGalleryElm:', photoGalleryElm);
        //console.log('$ justifiedGallery:', photoGalleryElm.justifiedGallery);

        console.log("justifiedGallery START");
        try {
            photoGalleryElm.justifiedGallery({
                    rowHeight: 120,
                    maxRowHeight: '200%',
                    //rel : 'gallery1',
                    lastRow: 'justify',
                    margins : 2,
                    border: 1,
                    captions: true
                })
                .on('jg.complete', function () {
                    console.log("justifiedGallery complete!!");

                    photoGalleryElm.magnificPopup({
                        delegate: 'a',
                        type: 'image',
                        closeOnContentClick: false,
                        closeBtnInside: false,
                        mainClass: 'mfp-with-zoom mfp-img-mobile',
                        image: {
                            verticalFit: true,
                            titleSrc: function(item) {
                                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                            }
                        },
                        gallery: {
                            enabled: true
                        },
                        zoom: {
                            enabled: true,
                            duration: 300, // don't foget to change the duration also in CSS
                            opener: function(element) {
                                return element.find('img');
                            }
                        }

                    });
                });
        } catch(err) {
            console.error('justifiedGallery Err:', err);
        }

    }

    getRenderList(photos){
        if(photos.items) {
            return photos.items.map(function(item){
                //console.log(item);
                var title = item.title + ' ('+numeral(item.bytes).format('0.0b')+')';
                var lSize = {
                    "width": item.size.large.width+"px",
                    "height": item.size.large.height+"px"
                };

                return (
                    <a key={item.id}
                       target="_blank"
                       title={title}
                       href={ photos.baseUrl + item.files.large }
                       style={ lSize } >
                        <img alt={ title }
                             src={ photos.baseUrl + item.files.small }
                             width={ item.size.small.width + "px" }
                             height={ item.size.small.height + "px" } />
                    </a>
                );
            });
        } else {
            return (<div></div>);
        }
    }

    render() {
        if(this.props.photos) {
            return (<div className="photoGalleryGrid">
                {this.getRenderList(this.props.photos)}
            </div>);
        } else {
            return (<div></div>);
        }
    }
};
