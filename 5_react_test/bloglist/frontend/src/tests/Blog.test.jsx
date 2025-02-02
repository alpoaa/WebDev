import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import Blog from '../components/Blog'
import testHelper from './testHelper'

describe('<Blog />', () => {
    let container
    const likeBlog   = vi.fn()
    const deleteBlog = vi.fn()

    beforeEach(() => {
        container = render(<Blog
            blog={testHelper.testBlog}
            loginUser={testHelper.testLoginUser}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog} />).container
    })

    test('component shows default only title and author', () => {
        const divSimple = container.querySelector('.blogSimple')
        const divAll    = container.querySelector('.blogAll')

        expect(divSimple).toBeDefined()
        expect(divAll).toBeNull()

        const element = screen.getByText(`${testHelper.testBlog.author} - ${testHelper.testBlog.title}`)
        expect(element).toBeDefined()
    })

    test('all data is showed when view button has been pressed', async() => {
        const user       = userEvent.setup()
        const viewButton = screen.getByText('View')
        await user.click(viewButton)

        const divSimple = container.querySelector('.blogSimple')
        const divAll    = container.querySelector('.blogAll')

        expect(divSimple).toBeNull()
        expect(divAll).toBeDefined()
    })

    test('like the blog twice creates two events', async() => {
        const user       = userEvent.setup()
        const viewButton = screen.getByText('View')
        await user.click(viewButton)

        const divAll = container.querySelector('.blogAll')
        expect(divAll).toBeDefined()

        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeBlog.mock.calls).toHaveLength(2)
    })
})