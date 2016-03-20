import React, { PropTypes } from 'react';
import Tab from 'material-ui/lib/tabs/tab';

const Link = ({ active, label, onClick }) => {
        if (active) {
            return <Tab label={label}
                    selected={true}
                    value={label}
                ></Tab>;
        }

        return (
            <Tab
                label={label}
                onClick={ e => {e.preventDefault(); onClick() } }
                selected={false}
                value={label}
            ></Tab>
        );
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;
