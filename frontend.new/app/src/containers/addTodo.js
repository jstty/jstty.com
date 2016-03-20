import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

let AddTodo = ({ dispatch }) => {
    let input

    return (
        <div>
            <form onSubmit={e => {
                    e.preventDefault();
                    var value = input.getValue();
                    console.log('AddTodo input:', input);
                    if (!value.trim()) {
                        return;
                    }
                    dispatch(addTodo(value));
                    input.clearValue(); // TODO: fix the warning
                }}>
                <TextField
                    floatingLabelText="Todo Item"
                    ref={node => {
                        input = node
                    }}
                />
                <RaisedButton primary type="submit">
                    Add Todo
                </RaisedButton>
            </form>
        </div>
    )
}

AddTodo = connect()(AddTodo);

export default AddTodo;