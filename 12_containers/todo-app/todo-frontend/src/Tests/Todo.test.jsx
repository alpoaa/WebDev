/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import Todo from '../Todos/Todo'

describe('<Todo />', () => {


    test('not renders if no todo value', () => {
        const nullObj = undefined
        const container = render(<Todo todo={nullObj} />).container
        const todoDiv = container.querySelector('.todoContent')

        expect(todoDiv).toBeNull()
        
    })

    test('renders when todo value', () => {
        const valueObj = {
            text: 'Testing text',
            done: false
        }
        const container = render(<Todo todo={valueObj} />).container
        const todoDiv = container.querySelector('.todoContent')

        expect(todoDiv).toBeDefined()
    })
})

