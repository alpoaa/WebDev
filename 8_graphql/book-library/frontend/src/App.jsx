import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client"

import Home from "./components/Home";
import Notification from "./components/Notification";
import Books from "./components/Books";
import Authors from "./components/Authors";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";

import { ALL_BOOKS, BOOK_ADDED } from "./graphql/books";

const App = () => {
    const [token, setToken] = useState(null)
    const [notif, setNotif] = useState(null)
    const apolloClient = useApolloClient()

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded
            sendNotification(`Addded book ${addedBook.title}`)
        }
    })

    if (!token && localStorage.getItem('user-token')) {
        setToken(localStorage.getItem('user-token'))
    }

    const sendNotification = (message) => {
        setNotif(message);

        setTimeout(() => {
            setNotif(null);
        }, 5000);
    };

    const signout = async() => {
        setToken(null)
        await apolloClient.resetStore()
    }

    const signin = (token) => setToken(token)

    return (
        <>
            <Notification message={notif} />
            <div>
                <Link to='/' style={{ margin: 3 }}>
                    Home
                </Link>
                <Link to='/authors' style={{ margin: 3 }}>
                    Authors
                </Link>
                <Link to='/books' style={{ margin: 3 }}>
                    Books
                </Link>
                <Link to='/newbook' style={{ margin: 3 }}>
                    New book
                </Link>
                <Link to='/recommendations' style={{ margin: 3 }}>
                    Recommendations
                </Link>
            </div>
            <Routes>
                <Route path='/' element={ <Home token={token} signin={signin} signout={signout} sendNotif={sendNotification} /> } />
                <Route
                    path='/books'
                    element={ token ? <Books sendNotif={sendNotification} /> : <Navigate to='/' /> }
                />
                <Route
                    path='/authors'
                    element={ token ? <Authors sendNotif={sendNotification} /> : <Navigate to='/' /> }
                />
                <Route
                    path='/newbook'
                    element={ token ? <NewBook sendNotif={sendNotification} /> : <Navigate to='/' />}
                />
                <Route 
                    path='/recommendations' 
                    element={ token ? <Recommendations sendNotif={sendNotification} /> : <Navigate to='/' /> } 
                />
            </Routes>
        </>
    );
};

export default App;
