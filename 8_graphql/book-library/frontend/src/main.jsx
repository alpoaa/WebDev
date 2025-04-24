import { createRoot } from "react-dom/client";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws";
import { BrowserRouter as Router } from "react-router-dom";

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('user-token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    }
})

const httpLink = createHttpLink({ uri: "http://localhost:4001" })
const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4001'
}))

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    authLink.concat(httpLink)
)

const client = new ApolloClient({
    link: splitLink,//authLink.concat(httpLink),
    //uri: "http://localhost:4001",
    cache: new InMemoryCache(),
    /*
    devtools: {
        enabled: true
    }
    */
});

createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
);
