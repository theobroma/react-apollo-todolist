import express from 'express';
import cors from 'cors';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { schema } from './src/schema';

mongoose.connect('mongodb://localhost/apollo');

const Todo = mongoose.model('Todo', { title: String, completed:Boolean });

const PORT = 7700;
const server = express();
//same port as client use http://localhost:3000
server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: { Todo }
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);
