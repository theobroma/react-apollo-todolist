const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];

const todoarr = [{
  id: 1,
  title: 'first',
  completed:true
}, {
  id: 2,
  title: 'second',
  completed:false
},{
  id: 3,
  title: 'third',
  completed:false
}];


let nextId = 4;

export const resolvers = {
  Query: {
    todoarr: () => {
      return todoarr;
    },
    todo: (root, { id }) => {
      return todoarr.find(todo => todo.id == id);
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name };
      todoarr.push(newChannel);
      return newChannel;
    },
  },
};


/*export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      return channels.find(channel => channel.id == id);
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
  },
};*/
