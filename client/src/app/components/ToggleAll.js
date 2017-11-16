import React, { Component } from 'react'

export default class ToggleAll extends Component {

  handleChange = (e) => {
    this.props.toggleAll();
    console.log("Click!!!")
  }

  render() {
    return (
      <div>
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.handleChange}
          checked
        />
        <label htmlFor="toggle-all">toggle-all</label>
      </div>
    )
  }
}
