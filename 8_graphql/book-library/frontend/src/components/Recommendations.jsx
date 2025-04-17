import { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { USER } from "../graphql/users"
import { FIND_BOOK_GENRE } from "../graphql/books"
import { types } from "../util/formDataTypes"

import FormData from "./FormData"
import Header from "./Header"

const Recommendations = ({ sendNotif }) => {
    const { loading: userQueryLoad, data: userQueryData } = useQuery(USER)
    const { loading: findQueryLoad, data: findQueryData } = useQuery(FIND_BOOK_GENRE, {
        variables: {
            genre: userQueryData ? userQueryData.me.favoriteGenre : ''
        },
        skip: !userQueryData
    })

    useEffect(() => {
        if ((userQueryData && userQueryData.me === null) || (findQueryData && findQueryData.allBooks === null)) {
            sendNotif("Loading data...");
        }

    }, [userQueryData, findQueryData])

    if (userQueryLoad || findQueryLoad) {
        return <p>Loading user data...</p>;
    }

    return (
        <>
            <Header text='Recommendations' />
            <p>Your favorite genre is: <strong>{userQueryData.me.favoriteGenre}</strong></p>
            <p>Here is list from your favorite genre:</p>
            <FormData data={findQueryData.allBooks} type={types.recommendation} />    
        </>
    )
}

export default Recommendations