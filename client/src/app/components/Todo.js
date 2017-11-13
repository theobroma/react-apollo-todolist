import React from 'react'
import classnames from 'classnames'

export default class Todo extends React.Component {
  render () {
    return (
      <li >
        {this.props.todo.title}
      </li>
    )
  }
}