import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import '../style/app.scss';
import TodoApp from './components/TodoApp';

import {
 ApolloClient,
 ApolloProvider,
 createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:7700/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 1000);
  },
}]);

const client = new ApolloClient({
   networkInterface,
});

function filter (state = 'SHOW_ALL', action) {
  if (action.type === 'SET_FILTER') {
    return action.filter
  }
  return state
}

const combinedReducer = combineReducers({
  filter,
  apollo: client.reducer(),
})

const store = compose(
  applyMiddleware(
    client.middleware(),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(combinedReducer)

render(
    <ApolloProvider client={client} store={store} >
      <TodoApp />
    </ApolloProvider>,
    document.getElementById('root')
)