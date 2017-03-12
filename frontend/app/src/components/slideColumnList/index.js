import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';

import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';

import Scroll from 'react-scroll';
var ScrollLink = Scroll.Link;
var ScrollElement = Scroll.Element;

import './style.scss';

var prevCol = null;

export default class SlideColumnList extends React.Component {

    constructor() {
        super();
    }

    render() { return (
        <div className="slide-column-list">
        {
            this.props.columns.map( (column, colIdx) => {
            if(prevCol && !prevCol.selection) {
                return false;
            }
            prevCol = column;
            return (
            <div className="column">
                <List subheader={<div className="header">{column.header}</div>} insetSubheader={ !!column.header }>
                {
                    column.items.map( (item, itemIdx) => { return (
                        //<ScrollLink activeClass="active" to={"scl."+colIdx+"."+(column.items[itemIdx+1] ? column.items[itemIdx+1].id : '')} spy={true} smooth={true} duration={500}>
                        //<ScrollElement name={"scl."+colIdx+"."+item.id}>
                        <ListItem
                            className={ "row " + ( item.id === column.selection ? "selection" : "") }
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText={<div className="name">{item.name}</div>}
                            secondaryText={<div className="desc">{item.desc}</div>}


                            onClick={ () => {
                                // TODO: find a better solution, try redux!!

                                // sets column selection to itemId
                                column.selection = item.id;

                                // scroll to next select item

                                // TODO: deselect all children columns

                                // clear prevCol
                                prevCol = null;

                                // force a redraw
                                this.forceUpdate();
                            } }
                        />
                        //</ScrollElement>
                        //</ScrollLink>
                    ) } )
                }
                </List>
            </div>
            ) } )
        }
        </div>
    ) }
};
