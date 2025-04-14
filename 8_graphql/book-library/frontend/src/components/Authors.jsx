import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries/authors";

import Header from "./Header";

const Authors = ({ sendNotif }) => {
    const queryResult = useQuery(ALL_AUTHORS);

    useEffect(() => {
        if (queryResult.data && queryResult.data.allAuthors === null) {
            sendNotif("Loading data...");
        }
    }, [queryResult.data]);

    if (queryResult.loading) {
        return <p>Loading authors...</p>;
    }

    const authors = queryResult.data.allAuthors;

    return (
        <>
            <Header text='Authors' />
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Born</th>
                            <th>Books</th>
                        </tr>
                        {authors.map((a) => (
                            <tr key={a.id}>
                                <td>{a.name}</td>
                                <td>{a.born}</td>
                                <td>{a.bookCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Authors;
