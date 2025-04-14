import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries/books";

import Header from "./Header";

const Books = ({ sendNotif }) => {
    const queryResult = useQuery(ALL_BOOKS);

    useEffect(() => {
        if (queryResult.data && queryResult.data.allAuthors === null) {
            sendNotif("Loading data...");
        }
    }, [queryResult.data]);

    if (queryResult.loading) {
        return <p>Loading books...</p>;
    }

    const books = queryResult.data.allBooks;
    return (
        <>
            <Header text='Books' />
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Author</th>
                            <th>Published</th>
                        </tr>
                        {books.map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Books;
