//Very useful template for understanding structure of  https://github.com/tastejs/todomvc-app-css
import React, { Component } from 'react';
import cx from 'classnames';
//mock data if needed
import todoarr from './mockdata';

export class Todo extends React.Component {

    state = {
      completed: this.props.todo.completed,
    }

    render () {
        return (
          <li className={cx({
            completed: this.props.todo.completed,
            editing: this.props.editing
          })}>
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
