/* eslint-disable react/prop-types */
import Header from './Header'

const CreateBlogForm = ({ loginUser, handleCreateBlog, title, author, url, handleChangeTitle, handleChangeAuthor, handleChangeUrl }) => {
    if (loginUser === null) {
        return null
    }

    return (
        <>
            <Header text='Create new blog' />
            <form onSubmit={handleCreateBlog}>
                <div>
                    <input placeholder='Title' type='text' value={title} onChange={handleChangeTitle} />
                </div>
                <div>
                    <input placeholder='Author' type='text' value={author} onChange={handleChangeAuthor} />
                </div>
                <div>
                    <input placeholder='URL' type='text' value={url} onChange={handleChangeUrl} />
                </div>
                <button type='submit'>Create</button>
            </form>
        </>
    )
}

export default CreateBlogForm