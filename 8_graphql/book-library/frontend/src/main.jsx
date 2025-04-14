import { createRoot } from "react-dom/client";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
    uri: "http://localhost:4001",
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
