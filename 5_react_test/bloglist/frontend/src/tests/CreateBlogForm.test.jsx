import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Togglable from '../components/Togglable'
import CreateBlogForm from '../components/CreateBlogForm'
import testHelper from './testHelper'

describe('<CreateBlogForm />', () => {
    let container
    const createBlog = vi.fn()

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel='Create blog' user={testHelper.testLoginUser}>
                <CreateBlogForm
                    loginUser={testHelper.testLoginUser}
                    createBlog={createBlog} />
            </Togglable>).container
    })

    test('Create blog creates correct event', async() => {
        const user         = userEvent.setup()
        const toggleButton = screen.getByText('Create blog')
        await user.click(toggleButton)

        const createBlogDiv = container.querySelector('.togglableChildren')
        expect(createBlogDiv).toBeDefined()

        const titleInput   = screen.getByPlaceholderText('Title')
        const authorInput  = screen.getByPlaceholderText('Author')
        const urlInput     = screen.getByPlaceholderText('URL')
        const createButton = screen.getByText('Create')

        await user.type(titleInput, testHelper.createNewBlog.title)
        await user.type(authorInput, testHelper.createNewBlog.author)
        await user.type(urlInput, testHelper.createNewBlog.url)
        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe(testHelper.createNewBlog.title)
        expect(createBlog.mock.calls[0][0].author).toBe(testHelper.createNewBlog.author)
        expect(createBlog.mock.calls[0][0].url).toBe(testHelper.createNewBlog.url)
    })
})