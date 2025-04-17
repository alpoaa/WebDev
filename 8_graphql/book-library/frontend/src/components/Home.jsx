import Header from "./Header";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Home = ({ token, signin, signout, sendNotif }) => {
    
    return (
        <>
            <Header text='Welcome' />
            <SignIn token={token} signin={signin} sendNotif={sendNotif} />
            <SignOut token={token} signout={signout} />
        </>
    );
};

export default Home;
