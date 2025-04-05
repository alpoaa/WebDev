import { createRoot } from "react-dom/client";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4001",
    cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
