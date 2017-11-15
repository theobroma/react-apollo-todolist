import React, { Component } from 'react'
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { gql,graphql } from 'react-apollo';
//old
import TodolList from './TodoList/TodoList';
import CreateTodo from './CreateTodo/CreateTodo';
//new
import AddTodo from './AddTodo';
import TodolListNew from './TodoListNew';
import Filters from './Filters';

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
                                filter={this.props.currentFilter}
                                toggleTodo={this.props.toggleTodo}
                                deleteTodo={this.props.deleteTodo}
                            />
                            <Filters setFilter={this.props.setFilter} filter={this.props.currentFilter} />
                            <pre>{JSON.stringify(this.props, '', 4)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const withTodos = graphql(
    gql`query TodoListQuery {
        todoarr {
          _id
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
          _id
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
  const withToggleTodo = graphql(
    gql`mutation toggleTodo($_id: ID!, $completed: Boolean!) {
      toggleTodo(_id: $_id, completed: $completed) { _id completed }
    }`,
    {
      props: ({ ownProps, mutate }) => ({
        toggleTodo (_id, completed) {
          return mutate({
            variables: { _id, completed },
            updateQueries: {
              todos: (state, { mutationResult }) => {
                return {
                  todoarr: state.todoarr.map(t => {
                    if (t._id===_id) {
                      return {
                        _id: t._id,
                        title: t.title,
                        completed: mutationResult.data.toggleTodo.completed,
                      }
                    }
                    return t
                  }),
                }
              },
            },
          })
        },
      }),
    }
  )

  const withDeleteTodo = graphql(
    gql`mutation deleteTodo($_id: ID!) {
      deleteTodo(_id: $_id) { _id }
    }`,
    {
      props: ({ ownProps, mutate }) => ({
        deleteTodo (_id) {
          return mutate({
            variables: { _id },
            updateQueries: {
              todos: (state, { mutationResult }) => {
                const itemindex = todoarr.findIndex(t => t._id === _id);
                return {
                  todoarr: { $splice: [itemindex, 1] }
                }
              },
            },
          })
        },
      }),
    }
  )

  const TodoAppWithState = connect(
    (state) => ({ currentFilter: state.filter }),
    (dispatch) => ({
      setFilter: (filter) => {
        dispatch({
          type: 'SET_FILTER',
          filter,
        })
      },
    }),
  )(TodoApp)


const TodoAppWithData = withTodos(withAddTodo(withToggleTodo(withDeleteTodo(TodoAppWithState))));
export default TodoAppWithData;
