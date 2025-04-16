import { createRoot } from "react-dom/client";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"

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
    uri: "http://localhost:4000"
})


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
