import React, { Component, Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default class ClearCompleted extends Component {
  handleClick = e => {
    this.props.clearCompleted();
    console.log('ClearCompleted!!!');
  };

  render() {
    return (
      <Fragment>
        <button className="clear-completed" onClick={this.handleClick}>
          Clear completed!
        </button>
        {/* <pre>{JSON.stringify(this.props, '', 4)}</pre> */}
      </Fragment>
    );
  }
}

// const query = gql`
//   query TodoListQuery {
//     todoarr {
//       _id
//       title
//       completed
//     }
//   }
// `;

// const data = client.readQuery({ query });
// console.log("Hello");
