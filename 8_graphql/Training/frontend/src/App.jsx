import { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";
import { ALL_PERSONS, PERSON_ADDED } from "./util/queries";

export const updateCache = (cache, query, addedPerson) => {
    const uniqByName = (a) => {
        let seen = new Set()
        return a.filter((item) => {
            let k = item.name
            return seen.has(k) ? false : seen.add(k)
        })
    }

    cache.updateQuery(query, ({ allPersons}) => {
        return {
            allPersons: uniqByName(allPersons.concat(addedPerson))
        }
    })
}

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
    const client = useApolloClient()
    const result = useQuery(ALL_PERSONS)


    //Polling every 2sec the interface
    /*
    const result = useQuery(ALL_PERSONS, {
        pollInterval: 2000,
    });
    */

    useSubscription(PERSON_ADDED, {
        onData: ({ data }) => {
            console.log(data)
            const addedPerson = data.data.personAdded
            notify(`${addedPerson.name} added`)
            updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
        }
    })


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
