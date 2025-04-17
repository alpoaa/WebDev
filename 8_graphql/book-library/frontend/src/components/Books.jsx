import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, FIND_BOOK_GENRE } from "../graphql/books";
import lodash from "lodash"
import Select from "react-select";

import Header from "./Header";
import FormData from "./FormData";
import { types } from "../util/formDataTypes"

const Books = ({ sendNotif }) => {
    const [genreFilter, setGenreFilter] = useState(null)
    const [books, setBooks] = useState([])
    const { loading, data, refetch } = useQuery(ALL_BOOKS, {
        pollInterval: 3000
    }); //queryResult
    const { loading: genreLoading, data: genreData } = useQuery(FIND_BOOK_GENRE, {
        variables: {
            genre: genreFilter
        },
        skip: !genreFilter
    })

    useEffect(() => {
        if (data && data.allBooks === null) {
            sendNotif("Loading data...");
        } else {
            if (!data)
            {
                refetch()
            }
            else
            {
                setBooks(data.allBooks)
            }
        }
    }, [data]);

    if (loading || genreLoading) {
        return <p>Loading books...</p>;
    }


    const genres = lodash.uniq(lodash.flatMap(data.allBooks, book => book.genres))
    const genreOptions = genres.map(genre => ({ value: genre, label: genre }))

    const filterData = (option) => setGenreFilter(option.value)
    const clearFilter = () => setGenreFilter(null)

    if (genreData) {
        return (
            <>
                <Header text='Books' />
                <button onClick={clearFilter}>Clear filter</button>
                <Select placeholder= 'Filter' value={genreFilter} onChange={filterData} options={genreOptions} />
                <FormData data={genreData.allBooks} type={types.book}/>
            </>
        )
    }

    return (
        <>
            <Header text='Books' />
            <button onClick={clearFilter}>Clear filter</button>
            <Select placeholder= 'Filter' value={genreFilter} onChange={filterData} options={genreOptions} />
            <FormData data={books} type={types.book}/>
        </>
    );
};

export default Books;
