import React from 'react'
import Todo from './Todo'
//mock data if needed
import todoarr from './mockdata';

export default class TodoList extends React.Component {

  _filterTodos = todo => (
    this.props.filter === 'SHOW_ALL' ||
    this.props.filter === 'SHOW_ACTIVE' && !todo.completed ||
    this.props.filter === 'SHOW_COMPLETED' && todo.completed
  )

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
