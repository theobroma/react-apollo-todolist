import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const CreateTodo = ({ mutate }) => {
    const handleKeyUp = evt => {
        if (evt.keyCode === 13) {
            evt.persist();
            mutate({
                variables: { title: evt.target.value }
            }).then(res => {
                evt.target.value = '';
            });
        }
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="New channel"
            onKeyUp={handleKeyUp}
        />
    );
};

const CreateTodoMutation = gql`
    mutation addTodo($title: String!) {
        addTodo(title: $title) {
            id
            title
        }
    }
`;

const CreateTodoWithMutation = graphql(CreateTodoMutation)(CreateTodo);

export default CreateTodoWithMutation;
