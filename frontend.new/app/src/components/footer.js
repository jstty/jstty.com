import React from 'react';
import FilterLink from '../containers/filterLink';
import Tabs from 'material-ui/lib/tabs/tabs';

const Footer = () => (
    <Tabs>
        <FilterLink filter="SHOW_ALL" label="All"></FilterLink>
        <FilterLink filter="SHOW_ACTIVE" label="Active"></FilterLink>
        <FilterLink filter="SHOW_COMPLETED" label="Completed"></FilterLink>
    </Tabs>
);

export default Footer;
