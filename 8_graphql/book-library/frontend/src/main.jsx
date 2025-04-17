import { createRoot } from "react-dom/client";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
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

const httpLink = createHttpLink({
    uri: "http://localhost:4001"
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //uri: "http://localhost:4001",
    cache: new InMemoryCache(),
    devtools: {
        enabled: true
    }
});

createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>
);
