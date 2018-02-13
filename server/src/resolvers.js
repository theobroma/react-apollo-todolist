import _some from 'lodash/some';
import _filter from 'lodash/filter';

export const resolvers = {
  Query: {
    todoarr: async (parent, args, { Todo }) => {
      const todosArr = await Todo.find();
      return todosArr;
    }
  },
  Mutation: {
    addTodo: async (parent, args, { Todo }) => {
      const todo = await new Todo(args).save();
      return todo;
    },
    toggleTodo: async (parent, args, { Todo }) => {
      //const todosArr = await Todo.find({ _id:args._id });
      const todo = await Todo.findByIdAndUpdate(
        args._id,
        {
          $set: { completed: args.completed }
        },
        { new: true }
      );
      return todo;
    },
    toggleAll: async (parent, args, { Todo }) => {
      //get all current todos
      const todosArr = await Todo.find();
      //logic of how to switch "completed" field of each todo:
      //if SOME of todos not yet completed - toggle all to true
      //else - toggle all to false
      const someNotCompleted = _some(todosArr, { completed: false });
      //toggle completed in each document
      await Promise.all(
        todosArr.map(async todo => {
          const t = await Todo.update({ _id: todo._id }, { $set: { completed: someNotCompleted } });
        })
      );
      //get all new current todos
      const newArr = await Todo.find();
      //console.log(someNotCompleted);
      return newArr;
    },
    clearCompleted: async (parent, args, { Todo }) => {
      const todosArr = await Todo.find();
      const completedTodos = _filter(todosArr, { completed: true });
      await Promise.all(
        completedTodos.map(async todo => {
          const t = await Todo.remove({ _id: todo._id });
        })
      );
    },
    deleteTodo: async (parent, args, { Todo }) => {
      const todo = await Todo.findByIdAndRemove(args._id);
      return todo;
    }
  }
};
