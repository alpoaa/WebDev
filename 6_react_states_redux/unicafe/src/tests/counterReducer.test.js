import deepFreeze from 'deep-freeze'
import counterReducer from '../reducers/counterReducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }

    test('should return a proper initial state when called with undefined', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }

        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)

        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
    })

    test('ok is incremented', () => {
        const action = {
            type: 'OK'
        }

        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)

        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0
        })
    })

    test('bad is incremented', () => {
        const action = {
            type: 'BAD'
        }

        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)

        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1
        })
    })

    test('zero returns initial state', () => {
        const goodAction = {
            type: 'GOOD'
        }

        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, goodAction)

        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })

        const zeroAction = {
            type: 'ZERO'
        }

        const zeroState = counterReducer(newState, zeroAction)

        expect(zeroState).toEqual(initialState)
    })
})