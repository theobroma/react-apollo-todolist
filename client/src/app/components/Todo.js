import React from 'react';
import cx from 'classnames';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
            this.state = { completed: this.props.todo.completed };
        }

    render () {
        return (
            <li className={cx({ complete: this.state.completed })} >
            {this.props.todo.title}
            </li>
        )
    }
}