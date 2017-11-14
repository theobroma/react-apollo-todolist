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
    deleteTodo: async (parent, args, { Todo }) => {
      //const todosArr = await Todo.find({ _id:args._id });
      const todo = await Todo.findByIdAndRemove(args._id);
      console.log(todo);
      return todo;
    },
  }
};


/*Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    le response = {
        message: "Todo successfully deleted",
        id: todo._id
    };
    res.status(200).send(response);
});*/
