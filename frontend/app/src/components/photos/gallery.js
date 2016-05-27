import React from 'react';

import $ from 'jquery';
import justifiedLib from 'imports?jQuery=jquery!justifiedGallery';
import justifiedCSS from 'justifiedGallery/dist/css/justifiedGallery.css';

import magnificLib from 'imports?jQuery=jquery!magnific-popup';
import magnificCSS from 'magnific-popup/dist/magnific-popup.css';


export default class Gallery extends React.Component {

    componentDidMount() {
        $(".photoGallery").justifiedGallery({
            rowHeight: 25,
            maxRowHeight: '100%',
            rel : 'gallery1',
            lastRow: 'justify',
            margins : 5
        }).on('jg.complete', function () {
            $('.photoGallery').magnificPopup({
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
    }

    getRenderList(photos){
        return photos.items.map(function(item){
            //console.log(item);
            var title = item.title + ' ('+item.bytes+')';
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
    }

    render() {
        if(this.props.photos) {
            return (<div id="photoGallery" className="photoGallery">
                {this.getRenderList(this.props.photos)}
            </div>);
        } else {
            return (<div></div>);
        }
    }
};
