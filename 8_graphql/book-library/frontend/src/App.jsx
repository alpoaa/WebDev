import { useState } from "react";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";

import Home from "./components/Home";
import Notification from "./components/Notification";
import Books from "./components/Books";
import Authors from "./components/Authors";
import NewBook from "./components/NewBook";

const App = () => {
    const [notif, setNotif] = useState(null);

    const sendNotification = (message) => {
        setNotif(message);

        setTimeout(() => {
            setNotif(null);
        }, 7000);
    };

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
            </div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/books'
                    element={<Books sendNotif={sendNotification} />}
                />
                <Route
                    path='/authors'
                    element={<Authors sendNotif={sendNotification} />}
                />
                <Route
                    path='/newbook'
                    element={<NewBook sendNotif={sendNotification} />}
                />
            </Routes>
        </>
    );
};

export default App;
