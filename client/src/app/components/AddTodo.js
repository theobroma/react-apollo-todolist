import React from 'react';
const ENTER_KEY = 13;

export default class AddTodo extends React.Component {

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();

    let val = this.textInput.value.trim();
    this.props.addTodo(val)
    //console.log(val);
    this.textInput.value = '';
  }

  render () {
    return (
      <div>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          ref={(input) => { this.textInput = input; }}
          onClick={this.focusTextInput}
          onKeyDown={this.handleNewTodoKeyDown}
        />
      </div>
    )
  }
}
