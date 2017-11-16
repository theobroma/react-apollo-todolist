import {  makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
    type TodoType {
      _id: ID!                # "!" denotes a required field
      title: String
      completed: Boolean
    }

    # This type specifies the entry points into our API.
    type Query {
      todoarr: [TodoType]    # "[]" means this is a list of todos
      todo(_id: ID!): TodoType
    }

    # The mutation root type, used to define all mutations.
    type Mutation {
      addTodo(title: String!): TodoType
      toggleTodo(_id: ID!, completed: Boolean!): TodoType
      toggleAll: [TodoType]
      deleteTodo(_id: ID!): TodoType
    }
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };

/*
    type Mutation {
      # A mutation to toggle todo completed
      toggleTodo(id: ID!, complete: Boolean!): TodoType
    }*/
