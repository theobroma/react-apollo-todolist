import React from 'react';
import FilterLink from './FilterLink';
//import ClearCompleted from './ClearCompleted';

export default class Filters extends React.Component {
  render() {
    return (
      <footer className="footer">
        {/* NOT FINISHED */}
        <span className="todo-count">
          <strong>12</strong> items left
        </span>
        <ul className="filters">
          <FilterLink type={'SHOW_ALL'} {...this.props}>
            All
          </FilterLink>
          <FilterLink type={'SHOW_ACTIVE'} {...this.props}>
            Active
          </FilterLink>
          <FilterLink type={'SHOW_COMPLETED'} {...this.props}>
            Completed
          </FilterLink>
          {/* NOT FINISHED */}
        </ul>
        {/* <ClearCompleted {...this.props} />*/}
      </footer>
    );
  }
}
