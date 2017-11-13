import React, { Component } from 'react'
import { render } from 'react-dom';
import TodolList from './TodoList/TodoList';
import CreateTodo from './CreateTodo/CreateTodo';

class TodoApp extends Component  {
    render () {
        return (
            <div className="App">
            <h3 className="center">React , GraphQL , Apollo</h3>
            <div className="row">
                <div className="col-lg-4 col-lg-offset-4">
                    <CreateTodo /><br/>
                    <TodolList />
                </div>
            </div>
            </div>
        )
    }
};
export default TodoApp;

