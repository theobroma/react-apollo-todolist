import React from 'react';
import cx from 'classnames';

export default class Todo extends React.Component {

    state = {
      completed: this.props.todo.completed,
    }

    render () {
        return (
            <li className={cx({ completed: this.state.completed })}>
            <div className="view">
              <input className="toggle" type="checkbox"
                onChange={e => {
                  this.props.toggleTodo(this.props.todo._id, !this.state.completed)
                  this.setState({completed: !this.state.completed})}}
                  checked={this.state.completed}
              />
              <label>{this.props.todo.title}</label>
              <button className="destroy" onClick={e => { this.props.deleteTodo(this.props.todo._id) }} />
            </div>
            </li>
        )
    }
}


export class TodoMVC extends React.Component {

    state = {
      completed: this.props.todo.completed,
    }

    render () {
        return (
          <li className={cx({ completed: this.props.todo.completed,editing: this.props.editing})}>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label onDoubleClick={this.handleEdit}>
              {this.props.todo.title}
            </label>
            <button className="destroy" onClick={this.props.onDestroy} />
          </div>
          <input className="edit" />
        </li>
        )
    }
}
