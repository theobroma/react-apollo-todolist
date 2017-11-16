import React, { Component } from 'react';
import classNames from 'classnames';
//import Todo from './Todo';
//mock data if needed
import todoarr from './mockdata';

export class Todo extends React.Component {

    state = {
      completed: this.props.todo.completed,
    }

    render () {
        return (
          <li className={classNames({
            completed: this.props.todo.completed,
            editing: this.props.editing
          })}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={this.props.todo.completed}
              onChange={this.props.onToggle}
            />
            <label onDoubleClick={this.handleEdit}>
              {this.props.todo.title}
            </label>
            <button className="destroy" onClick={this.props.onDestroy} />
          </div>
          <input
            ref="editField"
            className="edit"
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </li>
        )
    }
}

export default class TodoMVC extends Component {

  renderTodos () {
    return todoarr
      .reverse()
      .map(todo =>
        <Todo
          key={todo._id}
          todo={todo}
        />
      )
  }

  render() {
    return (
      <div>
        {/*Header*/}
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" />
        </header>
        {/*Main*/}
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
          />
          <label htmlFor="toggle-all">toggle-all</label>
          <ul className="todo-list">
            {this.renderTodos()}
          </ul>
        </section>
        {/*Footer*/}
        <footer className="footer">
          <span className="todo-count">
            <strong>12</strong> items left
          </span>
          <ul className="filters">
            <li>
              <a href="#/" className="selected"> All </a>
            </li>
            {' '}
            <li>
              <a href="#/active">Active</a>
            </li>
            {' '}
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button className="clear-completed">
            Clear completed
          </button>
        </footer>

      </div>
    );
  }
}
