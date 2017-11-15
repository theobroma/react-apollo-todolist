import React from 'react'
import Todo from './Todo'
//mock data if needed
import todoarr from './mockdata';

export default class TodoList extends React.Component {

  _filterTodos = (todo) => {
    console.log(this.props.filter);
    if(this.props.filter === 'SHOW_ALL'){
      return todo;
    } else if( this.props.filter === 'SHOW_ACTIVE'){
      return !todo.completed;
    } else if(this.props.filter === 'SHOW_COMPLETED'){
      return todo.completed;
    }
  }

  renderTodos () {
    return this.props.todos
      .filter(this._filterTodos)
      .reverse()
      .map(todo =>
        <Todo
          key={todo._id}
          todo={todo}
          toggleTodo={this.props.toggleTodo}
          deleteTodo={this.props.deleteTodo}
        />
      )
  }

  render () {
    return (
      <ul className="todo-list" >
        {this.renderTodos()}
        <pre>{JSON.stringify(this.props.filter, '', 4)}</pre>
      </ul>
    )
  }
}
