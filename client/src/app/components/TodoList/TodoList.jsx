import React, { Component } from 'react';
import {
  gql,
  graphql
} from 'react-apollo';

const TodoList = ({ data: {loading, error, todoarr }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }

   return <ul className="list-group">
     { todoarr.map( item => <li className="list-group-item"key={item.id}>{item.title}</li> ) }
   </ul>;
 };

const TodoListQuery = gql`
   query TodoListQuery {
     todoarr {
       id
       title
       completed
     }
   }
 `;
const TodoListWithData = graphql(TodoListQuery)(TodoList);
export default TodoListWithData;
