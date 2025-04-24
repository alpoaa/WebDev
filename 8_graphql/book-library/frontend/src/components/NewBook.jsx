import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS, BOOK_ADDED } from "../graphql/books";
import { ALL_AUTHORS } from "../graphql/authors";

import Header from "./Header";

const NewBook = ({ sendNotif }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedStr, setPublishedStr] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [
            { query: ALL_BOOKS },
            { query: ALL_AUTHORS}
        ],
        onError: (error) => {
            const messages = error.graphQLErrors
                .map((e) => e.message)
                .join("\n");
            sendNotif(messages);
        }
    });

    

    const submit = (event) => {
        event.preventDefault();
        
        let published = parseInt(publishedStr)
        createBook({ variables: { title, author, published, genres } });

        setTitle("");
        setAuthor("");
        setPublishedStr("");
        setGenre("");
        setGenres([]);
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    const handleChangeTitle = (event) => setTitle(event.target.value);
    const handleChangeAuthor = (event) => setAuthor(event.target.value);
    const handleChangePublished = (event) => setPublishedStr(event.target.value);
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
                        placeholder='Published'
                        value={publishedStr}
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
