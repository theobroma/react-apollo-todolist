import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import './style.scss';
import './todomvc.scss';
import TodoApp from './components/TodoApp';
//old apollo
// import {
//  ApolloClient,
//  ApolloProvider,
//  createNetworkInterface
// } from 'react-apollo';

//new Apollo
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';

//old client
// const networkInterface = createNetworkInterface({
//     uri: 'http://localhost:7700/graphql'
// });

// networkInterface.use([
//     {
//         applyMiddleware(req, next) {
//             setTimeout(next, 1000);
//         }
//     }
// ]);

// const client = new ApolloClient({
//     networkInterface
// });

//new client
const client = new ApolloClient({
    link: createHttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache()
});

//filter reducer
function filter(state = 'SHOW_ALL', action) {
    if (action.type === 'SET_FILTER') {
        return action.filter;
    }
    return state;
}

const rootReducer = combineReducers({
    filter
});

const logger = createLogger({
    // Collapse actions that don't have errors
    collapsed: (getState, action, logEntry) => !logEntry.error
});

const store = createStore(
    rootReducer,
    compose(applyMiddleware(logger), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <TodoApp />
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
