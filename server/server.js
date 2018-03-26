import path from 'path';
import express from 'express';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
//mongo
import mongoose from 'mongoose';
import Todo from './db/models/todo';
import loadModels from './db/models';
//apollo
import { schema } from './src/schema';

const db = process.env.MONGODB_URI || 'mongodb://localhost/apollotodo';

const connect = () => {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connectDb = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(db, err => {
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
//http://graphql.org/graphql-js/authentication-and-express-middleware/
function loggingMiddleware(req, res, next) {
  console.log('ip:', req.ip);
  next();
}

var root = {
  ip: function(args, request) {
    return request.ip;
  }
};

const app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'public', 'build')));

//app.use(loggingMiddleware);

// All routes in the end
//same port as client use http://localhost:3000
app.use('*', cors({ origin: 'http://localhost:3000' }));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: { Todo }
  })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

// Redirect all non api requests to the index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

app.listen(app.get('port'), () =>
  console.log(`GraphQL Server is now running on http://localhost:${app.get('port')}`)
);
