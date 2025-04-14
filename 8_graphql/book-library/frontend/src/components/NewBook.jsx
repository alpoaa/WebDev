import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS } from "../queries/books";

import Header from "./Header";

const NewBook = ({ sendNotif }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }],
        onError: (error) => {
            const messages = error.graphQLErrors
                .map((e) => e.message)
                .join("\n");
            sendNotif(messages);
        },
    });

    const submit = async (event) => {
        event.preventDefault();

        createBook({ variables: { title, author, published, genres } });

        setTitle("");
        setAuthor("");
        setPublished("");
        setGenre("");
        setGenres([]);
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    const handleChangeTitle = (event) => setTitle(event.target.value);
    const handleChangeAuthor = (event) => setAuthor(event.target.value);
    const handleChangePublished = (event) => setPublished(event.target.value);
    const handleChangeGenre = (event) => setGenre(event.target.value);

    return (
        <>
            <Header text='Add new book' />
            <form onSubmit={submit}>
                <div>
                    <input
                        placeholder='Title'
                        value={title}
                        onChange={handleChangeTitle}
                    />
                </div>
                <div>
                    <input
                        placeholder='Author'
                        value={author}
                        onChange={handleChangeAuthor}
                    />
                </div>
                <div>
                    <input
                        type='number'
                        placeholder='Published'
                        value={published}
                        onChange={handleChangePublished}
                    />
                </div>
                <div>
                    <input
                        placeholder='Add genre'
                        value={genre}
                        onChange={handleChangeGenre}
                    />
                    <button onClick={addGenre} type='button'>
                        Add genre
                    </button>
                    <div>
                        <p>Added genres: {genres.join(" ")}</p>
                    </div>
                </div>
                <button type='submit'>Create book</button>
            </form>
        </>
    );
};

export default NewBook;
