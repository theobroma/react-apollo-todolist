import {  makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
    type TodoType {
      _id: ID!                # "!" denotes a required field
      title: String
      completed: Boolean
    }

    # This type specifies the entry points into our API. In this case
    # there is only one - "todoarr" - which returns a list of todos.
    type Query {
      todoarr: [TodoType]    # "[]" means this is a list of todos
      todo(_id: ID!): TodoType
    }

    # The mutation root type, used to define all mutations.

    type Mutation {
      # A mutation to add a new todo to the list of todos
      addTodo(title: String!): TodoType
      # A mutation to toggle todo completed
      toggleTodo(_id: ID!, completed: Boolean!): TodoType
    }
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };

/*
    type Mutation {
      # A mutation to toggle todo completed
      toggleTodo(id: ID!, complete: Boolean!): TodoType
    }*/
