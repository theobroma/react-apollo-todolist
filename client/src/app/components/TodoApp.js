import React, { Component } from 'react'
import { render } from 'react-dom';
import { gql,graphql } from 'react-apollo';
//old
import TodolList from './TodoList/TodoList';
import CreateTodo from './CreateTodo/CreateTodo';
//new
import TodolListNew from './TodoListNew';
import AddTodo from './AddTodo'

class TodoApp extends Component  {
    render () {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                            <h3 className="center">React , GraphQL , Apollo</h3>
                            <AddTodo addTodo={this.props.addTodo} />
                            <TodolListNew
                                todos={this.props.todos || []}
                            />
                            <pre>{JSON.stringify(this.props, '', 4)}</pre>
                        </div>
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

const withAddTodo = graphql(
    gql`mutation addTodo($title: String!) {
        addTodo(title: $title) {
          id
          title
          completed
        }
    }`,
    {
      props: ({ ownProps, mutate }) => ({
        addTodo (title) {
          return mutate({
            variables: { title },
            updateQueries: {
              todos: (state, { mutationResult }) => {
                return update(state, {
                  todoarr: {
                    $push: [ mutationResult.data.addTodo ],
                  },
                })
              },
            },
          })
        },
      }),
    }
  )



const TodoAppWithData = withTodos(withAddTodo(TodoApp));
export default TodoAppWithData;