import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';

import GalleryGrid from './galleryGrid';

import './galleryTree.scss';
export default class GalleryTree extends React.Component {

    constructor(){
        super();

        this.galleryGridCat = null;
        this.currentPhotos = null;

        this.baseUrl = '';
        this.cats = [];
        this.subCat = '';
        this.files = {};

        this.filesState = {};
    }

    //componentWillMount(){
    //    console.log('componentWillMount files:', this.files, ', props:', this.props);
    //}
    //
    //componentDidMount() {
    //    console.log('componentDidMount files:', this.files, ', props:', this.props);
    //}

    componentWillReceiveProps(nextProps) {
        //console.log('componentWillReceiveProps files:', this.files, ', props:', nextProps);
        this.init(nextProps);
    }

    init(props) {
        //console.log('init props:', props);
        this.baseUrl = props.data.baseUrl;

        this.subCat = props.subCat || '_best';
        this.cats = _.keys(props.data.tree);

        this.cats.map(function(cat) {
            var files = props.data.tree[cat][this.subCat];
            //console.log('files:', files);
            //console.log('cat:', cat);
            this.files[cat] = files;
        }.bind(this));

        //console.log('init files:', this.files);
        _.forEach(this.files, function (files, cat) {
            var state = {
                active: 0,
                list: []
            };
            state.list.push(_.sample(files).files.small);
            state.list.push(_.sample(files).files.small);
            state.list.push(_.sample(files).files.small);
            this.filesState[cat] = state;
        }.bind(this));

        _.forEach(this.cats, function (cat) {
            var time = 3000 + _.random(0, 2000);
            //time = 5500;
            //setTimeout(function () {
            setInterval(function () {
                //console.log('init rotateActive:', cat);
                this.rotateActive(cat);
            }.bind(this), time);
        }.bind(this));
    }

    toggleGallaryGrid(photos){
        var $thisElm = $(ReactDOM.findDOMNode(this));

        var gridItemElm = $thisElm.find("#gallery-grid");
        //var treeItemElm = $thisElm.find("#gallery-tree");
        var treeItemElm = $thisElm.find("#gallery-tree-item-"+photos.cat);
        var allTreeItemElm = $thisElm.find(".gallery-tree-item");

        var treeItemPos = treeItemElm.offset() || { left: 0, right: 0 };
        //var treeItemPos = treeItemElm.position() || { left: 0, right: 0 };
        treeItemPos.width = treeItemElm.outerWidth();
        treeItemPos.height = treeItemElm.outerHeight();

        var treeRowElm = $thisElm;
        var treeRowPos = treeRowElm.offset() || { left: 0, right: 0 };
        //var treeRowPos = treeRowElm.position() || { left: 0, right: 0 };
        treeRowPos.width = treeRowElm.outerWidth();
        treeRowPos.height = treeRowElm.outerHeight();

        var diff = {
            left: treeItemPos.left - treeRowPos.left,
            right: treeItemPos.right - treeRowPos.right,
            width: treeItemPos.widht,
            height: treeItemPos.height,
        }

        console.log("treeItemPos:", treeItemPos);
        console.log("treeRowPos:", treeRowPos);
        //console.log("toggleGallaryGrid galleryGridCat:", this.galleryGridCat);
        //console.log('toggleGallaryGrid currentPhotos:', this.currentPhotos);
        console.log("toggleGallaryGrid photos:", photos);

        if (((this.galleryGridCat === null) ||
            (this.galleryGridCat === undefined)) &&
            photos && photos.cat) {
            this.galleryGridCat = photos.cat;
            this.currentPhotos = photos;
            this.setState({});

            gridItemElm.css('left', diff.left+'px');
            gridItemElm.css('top', diff.top+'px');
            gridItemElm.css('transition', 'opacity 500ms ease-in-out');

            setTimeout(function(){
                // show grid, hide tree
                allTreeItemElm.removeClass('g-visable');
                allTreeItemElm.addClass('g-hidden');

                gridItemElm.css('transition', 'opacity 150ms ease-in-out, width 250ms ease-in-out, top 500ms ease-in-out, left 500ms ease-in-out');
                gridItemElm.addClass('g-visable');
                gridItemElm.removeClass('g-hidden');
                gridItemElm.css('left', 0);
                gridItemElm.css('top', 0);
            }, 10);
        } else {
            this.galleryGridCat = null;
            this.currentPhotos = null;

            // show all trees, hide grid
            allTreeItemElm.removeClass('g-hidden');
            allTreeItemElm.addClass('g-visable');

            gridItemElm.addClass('g-hidden');
            gridItemElm.removeClass('g-visable');
            gridItemElm.css('left', diff.left+'px');
            gridItemElm.css('top', diff.top+'px');
        }

        console.log("galleryGridCat:", this.galleryGridCat, ', photos:', this.currentPhotos);
    }

    getRenderList(data){
        if(this.cats) {
            return this.cats.map(function (cat) {
                var photos = {
                    cat: cat,
                    baseUrl: this.baseUrl,
                    items: _.values(this.files[cat])
                };
                photos.title = cat.toUpperCase();
                photos.total = photos.items.length;

                return (
                    <a id={"gallery-tree-item-"+photos.cat} className="gallery-tree-item" href="javascript:;" onClick={this.toggleGallaryGrid.bind(this, photos)}>
                        <h4>{photos.title}<sub>{'(' + photos.total + ' photos)'}</sub></h4>
                        <div className="cat-photo-wrapper">
                            {this.renderActiveImages(photos.baseUrl, photos.cat)}
                        </div>
                    </a>
                );
            }.bind(this));
        } else {
            return (<div></div>);
        }
    }

    renderActiveImages(baseUrl, cat) {
        //console.log('renderActiveImages state:', this.filesState);
        if(this.filesState[cat] && this.filesState[cat].list) {
            //console.log('renderActiveImages state:', this.filesState[cat]);

            return this.filesState[cat].list.map(function (src, idx) {
                //console.log('renderActiveImages active:', this.filesState[cat].active, ', idx:', idx, ', src:', src, ', baseUrl:', baseUrl);
                var style = {
                    "background": "url("+(baseUrl + src)+") no-repeat center center"
                };

                return (
                    <div id={"cat-photo-"+cat+"-"+idx}
                         className={"cat-photo "+(this.filesState[cat].active === idx ? 'cp-visable' : 'cp-hidden') }
                         style={style}
                    />
                );
            }.bind(this));
        } else {
            return (<div></div>);
        }
    }

    rotateActive(cat) {
        if(this.filesState && this.filesState[cat]) {
            var $thisElm = $(ReactDOM.findDOMNode(this));

            var currentActiveIdx = this.filesState[cat].active;
            var newActiveIdx = this.filesState[cat].active + 1;
            // loop back around
            if(newActiveIdx >= this.filesState[cat].list.length) {
                newActiveIdx = 0;
            }

            var imgChangeIdx = newActiveIdx + 1;
            // loop back around
            if(imgChangeIdx >= this.filesState[cat].list.length) {
                imgChangeIdx = 0;
            }
            //console.log('rotateActive currentActiveIdx:', currentActiveIdx, ', newActiveIdx:', newActiveIdx, ', imgChangeIdx:', imgChangeIdx);

            this.filesState[cat].active = newActiveIdx;
            //this.filesState[cat].list[imgChangeIdx] = _.sample(this.files[cat]).files.small;
            //console.log('rotateActive newState:', newState);
            //this.setState(newState);

            // TODO: fix duplicate issue
            var src = _.sample(this.files[cat]).files.small;

            //$thisElm.find("#cat-photo-"+cat+"-"+imgChangeIdx).attr('src', this.baseUrl + src);
            $thisElm.find("#cat-photo-"+cat+"-"+imgChangeIdx).attr('style', "background:url("+(this.baseUrl + src)+") no-repeat center center;");

            $thisElm.find("#cat-photo-"+cat+"-"+currentActiveIdx).addClass('cp-hidden');
            $thisElm.find("#cat-photo-"+cat+"-"+currentActiveIdx).removeClass('cp-visable');
            $thisElm.find("#cat-photo-"+cat+"-"+newActiveIdx).addClass('cp-visable');
            $thisElm.find("#cat-photo-"+cat+"-"+newActiveIdx).removeClass('cp-hidden');
        }
    }

    renderGalleryGrid(photos) {
        /*
         <GalleryGrid photos={photos} id={'gallery-grid-'+cat} class="gallery" />
         <GalleryGrid photos={photos} />
         */
        console.log("renderGalleryGrid:", photos);

        if(photos) {
            return (<div>
                <h4>{photos.title}<sub>{'(' + photos.total + ' photos)'}</sub></h4>
                <GalleryGrid photos={photos} />
            </div>);
        } else {
            return (<div>test</div>);
        }
    }

    render() {
        //console.log('render props:', this.props, ', state:', this.state);
        if(this.props.data) {
            return (<div className="photoGalleryTree">

                <div className="photo-gallery-tree-wrapper">
                    <div id={'gallery-tree'}
                         className="gallery-tree-item-rows g-visable">
                        {this.getRenderList()}
                    </div>
                    <a id={'gallery-grid'}
                       className="gallery-tree-grid-item g-hidden"
                       href="javascript:;" onClick={this.toggleGallaryGrid.bind(this, this.galleryGridCat)}>
                        {this.renderGalleryGrid(this.currentPhotos)}
                    </a>
                </div>
            </div>);
        } else {
            return (<div></div>);
        }
    }
};
