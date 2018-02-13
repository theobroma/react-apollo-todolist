import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import AddTodo from './AddTodo';
import ToggleAll from './ToggleAll';
import TodolListNew from './TodoListNew';
import Filters from './Filters';
//testing HTML structure
import TodoMVC from './TodoMVC';

class TodoApp extends Component {
  render() {
    return (
      <div className="App">
        <section className="todoapp">
          {/*Header*/}
          <header className="header">
            <h1>todos</h1>
            <AddTodo addTodo={this.props.addTodo} />
          </header>
          {/*Main*/}
          <section className="main">
            <ToggleAll toggleAll={this.props.toggleAll} />
            <TodolListNew
              todos={this.props.todos || []}
              filter={this.props.currentFilter}
              toggleTodo={this.props.toggleTodo}
              deleteTodo={this.props.deleteTodo}
            />
          </section>
          {/*Footer*/}
          <Filters
            setFilter={this.props.setFilter}
            filter={this.props.currentFilter}
            clearCompleted={this.props.clearCompleted}
          />
          {/* <pre>{JSON.stringify(this.props, '', 4)}</pre> */}
        </section>
      </div>
    );
  }
}

//component for testing https://github.com/tastejs/todomvc-app-css
// class TodoApp extends Component  {
//     render () {
//         return (
//             <div className="App">
//               <section className="todoapp">
//                 <TodoMVC/>
//               </section>
//             </div>
//         )
//     }
// };

const withTodos = graphql(
  gql`
    query TodoListQuery {
      todoarr {
        _id
        title
        completed
      }
    }
  `,
  {
    props: ({ ownProps, data }) => {
      return {
        todos: data.todoarr
      };
    }
  }
);

const withAddTodo = graphql(
  gql`
    mutation addTodo($title: String!) {
      addTodo(title: $title) {
        _id
        title
        completed
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      addTodo(title) {
        return mutate({
          variables: { title },
          updateQueries: {
            todos: (state, { mutationResult }) => {
              return update(state, {
                todoarr: {
                  $push: [mutationResult.data.addTodo]
                }
              });
            }
          }
        });
      }
    })
  }
);

const withToggleTodo = graphql(
  gql`
    mutation toggleTodo($_id: ID!, $completed: Boolean!) {
      toggleTodo(_id: $_id, completed: $completed) {
        _id
        completed
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      toggleTodo(_id, completed) {
        return mutate({
          variables: { _id, completed },
          updateQueries: {
            todos: (state, { mutationResult }) => {
              return {
                todos: data.todoarr
              };
            }
          }
        });
      }
    })
  }
);

const withToggleAll = graphql(
  gql`
    mutation toggleAll {
      toggleAll {
        _id
        title
        completed
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      toggleAll() {
        return mutate({
          updateQueries: {
            todos: (state, { mutationResult }) => {
              return {
                todoarr: state.todoarr.map(t => {
                  if (t._id === _id) {
                    return {
                      _id: t._id,
                      title: t.title,
                      completed: mutationResult.data.toggleAll.completed
                    };
                  }
                  return t;
                })
              };
            }
          }
        });
      }
    })
  }
);

const withClearCompleted = graphql(
  gql`
    mutation clearCompleted {
      clearCompleted {
        _id
        title
        completed
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      clearCompleted() {
        return mutate({
          updateQueries: {
            todos: (state, { mutationResult }) => {
              return {
                todoarr: state.todoarr.map(t => {
                  if (t._id === _id) {
                    return {
                      _id: t._id,
                      title: t.title,
                      completed: mutationResult.data.toggleAll.completed
                    };
                  }
                  return t;
                })
              };
            }
          }
        });
      }
    })
  }
);

const withDeleteTodo = graphql(
  gql`
    mutation deleteTodo($_id: ID!) {
      deleteTodo(_id: $_id) {
        _id
      }
    }
  `,
  {
    props: ({ ownProps, mutate }) => ({
      deleteTodo(_id) {
        return mutate({
          variables: { _id },
          updateQueries: {
            todos: (state, { mutationResult }) => {
              const itemindex = todoarr.findIndex(t => t._id === _id);
              return {
                todoarr: { $splice: [itemindex, 1] }
              };
            }
          }
        });
      }
    })
  }
);

//connect to redux state
const TodoAppWithState = connect(
  state => ({ currentFilter: state.filter }),
  dispatch => ({
    setFilter: filter => {
      dispatch({
        type: 'SET_FILTER',
        filter
      });
    }
  })
)(TodoApp);

const TodoAppWithData = compose(
  withDeleteTodo,
  withClearCompleted,
  withToggleAll,
  withToggleTodo,
  withAddTodo,
  withTodos
)(TodoAppWithState);

//const TodoAppWithData = withTodos(withAddTodo(withToggleTodo(withToggleAll(withDeleteTodo(TodoAppWithState)))));
export default TodoAppWithData;
