import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'

describe.only('<Togglable />', () => {
    let container
    
    beforeEach(() => {
        container = render(
            <Togglable buttonLabel='Show'>
                <div className='testDiv'>togglable content</div>
            </Togglable>).container
    })

    test('Render children', () => {
        screen.getByText('togglable content')
    })

    test('Children not visible at start', () => {
        const div = container.querySelector('.togglableChildren')
        expect(div).toHaveStyle('display: none')
    })

    test('After click, the children is visible', async() => {
        const user   = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)

        const div = container.querySelector('.togglableChildren')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', async () => {
        const user   = userEvent.setup()
        const button = screen.getByText('Show')
        await user.click(button)
    
        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)
    
        const div = container.querySelector('.togglableChildren')
        expect(div).toHaveStyle('display: none')
      })
})