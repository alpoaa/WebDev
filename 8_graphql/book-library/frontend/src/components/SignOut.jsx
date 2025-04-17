import Header from "./Header"

const SignOut = ({ token, signout }) => {
    if (!token) {
        return null
    }

    const submitLogout = async(event) => {
        event.preventDefault()
        localStorage.removeItem('user-token')
        signout()
    }

    return (
        <>
            <Header text='Sign out from application' />
            <form onSubmit={submitLogout}>
                <button type='submit'>Sign out</button>
            </form>
        </>
    )
}

export default SignOut