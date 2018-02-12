import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class TodoListNew extends Component {
    render() {
        const { loading, error, todoarr } = this.props.data;
        return (
            <div>
                <ul className="list-group">
                    {todoarr.map(item => (
                        <li className="list-group-item" key={item.id}>
                            {item.title}
                        </li>
                    ))}
                </ul>
                {console.log(todoarr)}
                <pre>{JSON.stringify(this.props, '', 4)}</pre>
            </div>
        );
    }
}

const TodoList = ({ data: { loading, error, todoarr } }) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <ul className="list-group">
            {todoarr.map(item => (
                <li className="list-group-item" key={item.id}>
                    {item.title}
                </li>
            ))}
        </ul>
    );
};

const TodoListQuery = gql`
    query TodoListQuery {
        todoarr {
            id
            title
            completed
        }
    }
`;
const TodoListWithData = graphql(TodoListQuery)(TodoList);
export default TodoListWithData;
