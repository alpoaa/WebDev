import { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";
import { ALL_PERSONS } from "./util/queries";

const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
        return null;
    }

    return (
        <>
            <div style={{ color: "red" }}>
                <p>{errorMessage}</p>
            </div>
        </>
    );
};

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null)

    //Polling every 2sec the interface
    const result = useQuery(ALL_PERSONS, {
        pollInterval: 2000,
    });

    const client = useApolloClient()

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    };

    if (result.loading) {
        return <div>loading...</div>;
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (!token) {
        return (
            <>
                <Notify errorMessage={errorMessage} />
                <h2>Login</h2>
                <LoginForm setError={notify} setToken={setToken} />
            </>
        )
    }

    return (
        <>
            <Notify errorMessage={errorMessage} />
            <button onClick={logout}>Logout</button>
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify} />
            <PhoneForm setError={notify} />
        </>
    );
};

export default App;
