const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, logout, createUser, createBlog } = require('./testHelper')
const exp = require('constants')

describe('Blog app', () => {
    beforeEach(async({ page, request }) => {
        await request.post(process.env.RESET_API)
 
        await createUser(request, process.env.TEST_USR, 'Tester', process.env.TEST_USR_PWD)

        await page.goto('/')
    })

    test('Login form is shown', async({ page }) => {
        await expect(page.getByText('Log in to application')).toBeVisible()
    })

    describe('Login to application', () => {
        test('Succeeds with correct credentials', async({ page }) => {
            await login(page, process.env.TEST_USR, process.env.TEST_USR_PWD)

            await expect(page.getByText('Signed in')).toBeVisible()
            await expect(page.getByText('Tester logged in')).toBeVisible()
        })

        test('Fails with wrong credentials', async({ page }) => {
            await login(page, 'InvalidUsername', 'InvalidPassword')

            await expect(page.getByText('invalid username or password')).toBeVisible()
        
            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('invalid username or password')
            await expect(errorDiv).toHaveCSS('color', 'rgba(224, 10, 10, 0.827)')
        })
    })

    describe('When logged in', () => {
        beforeEach(async({ page }) => {
            await login(page, process.env.TEST_USR, process.env.TEST_USR_PWD)
        })

        test('Blog can be created', async({ page }) => {
            await createBlog(page, 'TestTitle', 'TestAuthor', 'http://localhost.com')

            //Notification
            await expect(page.getByText('TestTitle').first()).toBeVisible()

            //Blogs list
            const blogDiv = page.locator('.blogSimple').first()
            await expect(blogDiv).toContainText('TestAuthor - TestTitle')
        })

        test('Blog can be liked', async({ page }) => {
            await createBlog(page, 'TestTitle', 'TestAuthor', 'http://localhost.com')

            //Blogs list
            const blogDivSimple = page.locator('.blogSimple').first()
            await blogDivSimple.getByRole('button', {name: 'View' }).click()

            const blogDivAll = page.locator('.blogAll').first()
            await expect(blogDivAll).toContainText('TestAuthor - TestTitle')
            await expect(blogDivAll).toContainText('Likes: 0')
            await blogDivAll.getByRole('button', { name: 'Like' }).click()
            await expect(blogDivAll).toContainText('Likes: 1')
        })

        test('Blog can be deleted', async({ page }) => {
            await createBlog(page, 'TestTitle', 'TestAuthor', 'http://localhost.com')

            //Blogs list
            const blogDivSimple = page.locator('.blogSimple').first()
            await blogDivSimple.getByRole('button', {name: 'View' }).click()

            const blogDivAll = page.locator('.blogAll').first()
            
            page.on('dialog', async(dialog) => {
                expect(dialog.type()).toContain('confirm')
                expect(dialog.message()).toContain('Delete blog TestTitle by author TestAuthor')
                await dialog.accept()
            })

            await blogDivAll.getByRole('button', { name: 'Delete'}).click()
            await expect(page.getByText(`Successfully deleted blog TestTitle`)).toBeVisible()
        })

        describe('Multiple users', () => {
            beforeEach(async({ page, request }) => {
                await createBlog(page, 'TestTitle', 'TestAuthor', 'http://localhost.com')
                await expect(page.getByText('TestTitle').first()).toBeVisible()

                //Logout from the user who has created the blog
                await logout(page)
                await expect(page.getByText('Logged out')).toBeVisible()

                //Create another user(s)
                await createUser(request, process.env.TEST_USR_2, 'Test user 2', process.env.TEST_USR_2_PWD)
            })

            test('Delete button is not visible to user who has not created it', async({ page, request }) => {                
                await login(page, process.env.TEST_USR_2, process.env.TEST_USR_2_PWD)
                await expect(page.getByText('Test user 2 logged in')).toBeVisible()

                const blogDivSimple = page.locator('.blogSimple').first()
                await blogDivSimple.getByRole('button', {name: 'View' }).click()

                const blogDivAll = page.locator('.blogAll').first()
                await expect(blogDivAll.getByRole('button', { name: 'Delete' })).not.toBeVisible()
            })
        })

        describe('Multiple blogs', () => {
            beforeEach(async({ page }) => {
                await createBlog(page, 'Blog1', 'Author1', 'http://blog1.com')
                await createBlog(page, 'Blog2', 'Author2', 'http://blog2.com')
                await createBlog(page, 'Blog3', 'Author3', 'http://blog3.com')
            })

            test('Most liked blog is first', async({ page }) => {
                const blog2DivSimple = page.locator('.blogSimple')
                    .filter({hasText: 'Author2 - Blog2' })
                
                await expect(blog2DivSimple).toBeVisible()
                await blog2DivSimple.getByRole('button', { name: 'View' }).click()

                const blog2DivAll = page.locator('.blogAll').first()
                await blog2DivAll.getByRole('button', { name: 'Like'}).click()
                await blog2DivAll.getByRole('button', { name: 'Hide' }).click()

                const blogDiv = page.locator('.blogSimple').first()
                await expect(blogDiv).toContainText('Author2 - Blog2')
            })
        })
    })
})