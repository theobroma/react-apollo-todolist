import mongoose from 'mongoose';
import loadModels from './models';

const db = process.env.MONGODB_URI || 'mongodb://localhost/apollotodo';

const connect = () => {
  // Find the appropriate database to connect to, default to localhost if not found.
  const connectDb = () => {
    mongoose.Promise = require('bluebird');
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

export default connect;