import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import { expect, test } from 'vitest'

test('renders content', () => {
    const note = {
        content: 'Component testing is done',
        important: true
    }

    render(<Note note={note} />)

    const element = screen.getByText(note.content)

    expect(element).toBeDefined()
})

test('render content using css', () => {
    const note = {
        content: 'Component testing is done',
        important: true
    }

    const { container } = render(<Note note={note} />)
    //Using css class selector
    const div = container.querySelector('.note')

    //Using css id selector
    //const element = screen.getByTestId('cssId-element')
    expect(div).toHaveTextContent('Component testing is done')
})

test('render content debug', () => {
    const note = {
        content: 'Component testing is done',
        important: true
    }

    render(<Note note={note} />)
    screen.debug() //debug

    const element = screen.getByText(note.content)

    //debug specific element
    //screen.debug(element)
    expect(element).toBeDefined()
})

test('clicking button calls event handler', async() => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
      }
    
      const mockHandler = vi.fn()
    
      render(<Note note={note} toggleImportance={mockHandler} />)
    
      const user = userEvent.setup()
      const button = screen.getByText('make not important')
      await user.click(button)
    
      expect(mockHandler.mock.calls).toHaveLength(1)
})