import express from 'express';
import cors from 'cors';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
//mongo
import mongoose from 'mongoose';
import Todo from './db/models/todo';
import loadModels from './db/models';
//import { connect } from './db';
//apollo
import { schema } from './src/schema';

const db = process.env.MONGODB_URI || 'mongodb://localhost/apollotodo';

const connect = () => {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connectDb = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(db, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${db}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${db}`);
      }
    });
  };
  connectDb();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connectDb);

  loadModels();
};
/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

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
