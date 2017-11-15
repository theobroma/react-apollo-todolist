export const resolvers =  {
  Query: {
    todoarr: async (parent, args, { Todo }) => {
      const todosArr = await Todo.find();
      return todosArr;
    },
  },
   Mutation: {
    addTodo: async (parent, args, { Todo }) => {
      const todo = await new Todo(args).save();
      return todo;
    },
    toggleTodo: async (parent, args, { Todo }) => {
      //const todosArr = await Todo.find({ _id:args._id });
      const todo = await   Todo.findByIdAndUpdate(args._id,
        { $set: { completed: args.completed }
        }, { new: true });
      console.log(todo);
      return todo;
    },
    deleteTodo: async (parent, args, { Todo }) => {
      const todo = await Todo.findByIdAndRemove(args._id);
      return todo;
    },
  }
};
