import React from 'react'

export default class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  _onSubmit () {
    this.props.addTodo(this.input.value)
    this.input.value = ''
  }

  render () {
    return (
      <div>
        <input
          className="new-todo"
          placeholder="What needs to be done"
          ref={(input) => { this.textInput = input; }}
          onClick={this.focusTextInput}

        />
        <button onClick={e => this._onSubmit()}>
          Add Todo
        </button>
      </div>
    )
  }
}
