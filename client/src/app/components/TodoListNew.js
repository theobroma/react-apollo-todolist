import React from 'react'
import Todo from './Todo'
//mock data if needed
import todoarr from './mockdata';

export default class TodoList extends React.Component {

 renderTodos () {
    return this.props.todos
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
      </ul>
    )
  }
}
