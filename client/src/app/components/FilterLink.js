import React from 'react'
import classnames from 'classnames'

export default class FilterLink extends React.Component {

  render () {
    return (
      <li>
        <a href='#' onClick={() => this.props.setFilter(this.props.type)}
          className={classnames({ selected: this.props.filter === this.props.type })}>
          {this.props.children}
        </a>
      </li>
    )
  }
}
