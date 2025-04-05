import { useState } from "react";
import { useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
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

    //Polling every 2sec the interface
    const result = useQuery(ALL_PERSONS, {
        pollInterval: 2000,
    });

    if (result.loading) {
        return <div>loading...</div>;
    }

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    };

    return (
        <>
            <Notify errorMessage={errorMessage} />
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify} />
            <PhoneForm setError={notify} />
        </>
    );
};

export default App;
