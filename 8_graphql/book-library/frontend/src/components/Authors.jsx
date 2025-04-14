import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";
import { ALL_AUTHORS, UPDATE_AUTHOR_BIRTHYEAR } from "../queries/authors";

import Header from "./Header";

const Authors = ({ sendNotif }) => {
    const [updateAuthor, setUpdateAuthor] = useState(null)
    const [updateAuthorBorn, setUpdateAuthorBorn] = useState(0)

    const queryResult = useQuery(ALL_AUTHORS);
    const [updateBornYear] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            const messages = error.graphQLErrors
                .map((e) => e.message)
                .join("\n");
            sendNotif(messages);
        }
    })

    useEffect(() => {
        if (queryResult.data && queryResult.data.allAuthors === null) {
            sendNotif("Loading data...");
        }
    }, [queryResult.data]);

    if (queryResult.loading) {
        return <p>Loading authors...</p>;
    }

    const authors = queryResult.data.allAuthors;
    const authorOptions = authors.map(author => ({ value: author.name, label: author.name }))
    const handleChangeBorn = (event) => setUpdateAuthorBorn(event.target.value)

    const updateAuthorBornYear = () => {
        let name = updateAuthor.value
        let setBornTo = parseInt(updateAuthorBorn)
        updateBornYear({ variables: { name, setBornTo } })

        setUpdateAuthor(null)
        setUpdateAuthorBorn(0)
    }
 
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
            <div>
                <Header text='Update birthyear' />
                <Select defaultValue={updateAuthor} onChange={setUpdateAuthor} options={authorOptions} />
                <p>Born:</p>
                <input type='number' value={updateAuthorBorn} onChange={handleChangeBorn}/>
                <button onClick={updateAuthorBornYear}>Update author</button>
            </div>
        </>
    );
};

export default Authors;
