import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_PERSON } from "../util/queries";

const Person = ({ person, onClose }) => {
    return (
        <>
            <h2>{person.name}</h2>
            <p>
                {person.address.street} {person.address.city}
            </p>
            <p>{person.phone}</p>
            <button onClick={onClose}>close</button>
        </>
    );
};

const Persons = ({ persons }) => {
    const [nameToSearch, setNameToSearch] = useState(null);
    const result = useQuery(FIND_PERSON, {
        variables: { nameToSearch },
        skip: !nameToSearch,
    });

    if (nameToSearch && result.data) {
        return (
            <Person
                person={result.data.findPerson}
                onClose={() => setNameToSearch(null)}
            />
        );
    }

    return (
        <>
            <h2>Persons</h2>
            {persons.map((p) => (
                <div key={p.id}>
                    {p.name} {p.phone}
                    <button onClick={() => setNameToSearch(p.name)}>
                        show address
                    </button>
                </div>
            ))}
        </>
    );
};

export default Persons;
