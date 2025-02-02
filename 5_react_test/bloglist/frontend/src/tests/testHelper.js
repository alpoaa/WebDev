let testLoginUser = {
    token: 'testToken',
    username: 'test',
    name: 'test'
}

let testBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'https://localhost.com',
    likes: 0,
    user: {
        username: testLoginUser.username,
        name: testLoginUser.name
    }
}

let createNewBlog = {
    title: 'New test blog',
    author: 'testAuthor',
    url: 'https://localhost.com'
}

export default {
    testLoginUser,
    testBlog,
    createNewBlog
}