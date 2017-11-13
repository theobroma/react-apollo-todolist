import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
// apollo-link also need to be installed
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// __SIMPLE_API_ENDPOINT__
const httpLink = new HttpLink({ uri: 'http://localhost:7700/graphql' })

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

