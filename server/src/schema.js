import {  makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
    type TodoType {
      id: ID!                # "!" denotes a required field
      title: String
      completed: Boolean
    }

    # This type specifies the entry points into our API. In this case
    # there is only one - "channels" - which returns a list of channels.
    type Query {
      todoarr: [TodoType]    # "[]" means this is a list of todos
      todo(id: ID!): TodoType
    }

    # The mutation root type, used to define all mutations.
    type Mutation {
      # A mutation to add a new channel to the list of channels
      addChannel(title: String!): TodoType
    }
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
