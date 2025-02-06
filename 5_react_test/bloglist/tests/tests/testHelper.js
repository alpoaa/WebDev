const login = async(page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const logout = async(page) => {
    await page.getByRole('button', { name: 'Logout' }).click()
}

const createUser = async(request, username, name, password) => {
    await request.post(process.env.USERS_API, {
        data: {
            name,
            username,
            password
        }
    })
}

const createBlog = async(page, title, author, url) => {
    await page.getByRole('button',{ name: 'Create blog' }).click()
    await page.getByPlaceholder('Title').fill(title)
    await page.getByPlaceholder('Author').fill(author)
    await page.getByPlaceholder('URL').fill(url)
    await page.getByRole('button', { name: 'Create' }).click()
    
    const newBlogDiv = page.locator('.blogSimple')
        .filter({ hasText: `${author} - ${title}`})
    
    newBlogDiv.waitFor()
}

export { login, logout, createUser, createBlog }