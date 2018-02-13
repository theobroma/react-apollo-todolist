import React, { Component } from 'react';

export default class ClearCompleted extends Component {
  handleClick = e => {
    this.props.clearCompleted();
    console.log('ClearCompleted!!!');
  };

  render() {
    return (
      <div>
        <button className="clear-completed" onClick={this.handleClick}>
          Clear completed
        </button>
        <pre>{JSON.stringify(this.props, '', 4)}</pre>
      </div>
    );
  }
}
