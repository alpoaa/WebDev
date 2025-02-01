import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'

test('<NoteForm /> updates parent state and calls submit', async() => {
    const user       = userEvent.setup()
    const createNote = vi.fn()

    const { container } = render(<NoteForm createNote={createNote} />)

    //screen.getByRole('textbox') -> list where can be multiple 'textbox', would need a handling which one to use
    //screen.getByPlaceholderText('write new note') -> use the placeholder
    //container.querySelector('#note-input') -> using id
    const input      = screen.getByPlaceholderText('write new note')
    const sendButton = screen.getByText('save')
    
    await user.type(input, 'testing form...')
    await user.click(sendButton)

    console.log(createNote.mock.calls)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing form...')
})