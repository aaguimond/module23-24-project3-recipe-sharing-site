import React from "react";
import ReactDOM from "react-dom";
// Import necessary modules from Apollo Client
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";

// Create a http link to GraphQL server
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

// Create middleware link to set the HTTP headers for each request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create a new Apollo client instance
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

// Render the React application and wrap it with ApolloProvider to... 
// ...make ApolloClient available throughout the entire application
ReactDOM.render(
    <ApolloProvider client ={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
