export const resolvers =  {
  Query: {
    todoarr: async (parent, args, { Todo }) => {
      // { _id: 123123, name: "whatever"}
      const todosArr = await Todo.find();
      return todosArr.map((x) => {
        x._id = x._id.toString();
        return x;
      });
    },
  },
   Mutation: {
    addTodo: async (parent, args, { Todo }) => {
      // { _id: 123123, name: "whatever"}
      const todo = await new Todo(args).save();
      todo._id = todo._id.toString();
      return todo;
    },
  },  
};