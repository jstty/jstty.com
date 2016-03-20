import React, { PropTypes } from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';

const Todo = ({ onClick, completed, text }) => (
    <ListItem
        leftCheckbox={<Checkbox
            onClick={onClick}
            defaultChecked={completed}
            />}
        primaryText={text}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    ></ListItem>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;
