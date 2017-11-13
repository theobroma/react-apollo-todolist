export const resolvers =  {
  Query: {
    todoarr: async (parent, args, { Todo }) => {
      // { _id: 123123, name: "whatever"}
      const todosArr = await Todo.find();
      return todosArr;
    },
  },
   Mutation: {
    addTodo: async (parent, args, { Todo }) => {
      // { _id: 123123, title: "whatever"}
      const todo = await new Todo(args).save();
      console.log(todo);
      return todo;
    },
    toggleTodo: async (parent, args, { Todo }) => {
      console.log(args.completed )
      //const todosArr = await Todo.find({ _id:args._id });
      const todo = await   Todo.findByIdAndUpdate(args._id,
        { $set: { completed: args.completed }
        }, { new: true });
      console.log(todo);
      return todo;
    },
  }
};

/*  Mutation: {
    toggleTodo: async (parent, args, { Todo }) => {
      // { _id: 123123, name: "whatever"}
      const todo = await new Todo.findByIdAndUpdate(args.id,
        { $set: { completed:args.completed }}
      );
      todo._id = todo._id.toString();
      return todo;
    },
  }*/
