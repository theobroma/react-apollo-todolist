import React, { Component } from 'react'
import { render } from 'react-dom';
import { gql,graphql } from 'react-apollo';
//old
import TodolList from './TodoList/TodoList';
import CreateTodo from './CreateTodo/CreateTodo';
//new
import TodolListNew from './TodoListNew';

class TodoApp extends Component  {
    render () {
        return (
            <div className="App">
            <h3 className="center">React , GraphQL , Apollo</h3>
            <div className="row">
                <div className="col-lg-4 col-lg-offset-4">
                    <TodolListNew
                        todos={this.props.todos || []}
                    />
                    <pre>{JSON.stringify(this.props, '', 4)}</pre>
                </div>
            </div>
            </div>
        )
    }
};
//old
const TodoListQuery = gql`
query TodoListQuery {
  todoarr {
    id
    title
    completed
  }
}
`;

const withTodos = graphql(
    gql`query TodoListQuery {
        todoarr {
          id
          title
          completed
        }
    }`,
    {
        props: ({ ownProps, data }) => {
            return {
                todos: data.todoarr,
            }
        },
    }
)



const TodoAppWithData = withTodos(TodoApp);
export default TodoAppWithData;