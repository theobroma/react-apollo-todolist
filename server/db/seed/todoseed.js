/* eslint no-loop-func:0 */
import mongoose from 'mongoose';
import Todo from '../models/todo';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/apollotodo';

//deprication fix https://github.com/Automattic/mongoose/issues/5399/#issuecomment-322041860
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
})
.then(() => {
    console.log('Connected to MongoDB at ', mongoUri);
    return mongoose.connection;
})
.catch(err => debug(`Database connection error: ${err.message}`));

const arr = [
  new Todo({
    title:"first MONGO todo",
    completed:true
  }),
  new Todo({
    title:"second MONGO todo",
    completed:false
  }),
  new Todo({
    title:"third MONGO todo",
    completed:false
  }),
  new Todo({
    title:"fourth MONGO todo",
    completed:false
  }),
  new Todo({
    title:"fifth MONGO todo",
    completed:false
  })
];

function exit() {
  mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

let done = 0;
for (let i = 0; i < arr.length; i++) {
  arr[i].save((err, result) => {
    done++;
    if (done === arr.length) {
      exit();
    }
  });
}
