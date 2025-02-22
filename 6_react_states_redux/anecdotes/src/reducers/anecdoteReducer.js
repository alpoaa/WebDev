import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        /*
        anecdoteCreate(state, action) {
            state.push(action.payload)
        },
        */
       /*
        anecdoteVote(state, action) {
            const id = action.payload.id
            const anecdoteVote = state.find(anecdote => anecdote.id === id)
            const updatedAnecdote = {
                ...anecdoteVote,
                votes: anecdoteVote.votes + 1
            }

            return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
        },
        */
        anecdoteUpdate(state, action) {
            const updatedAnecdote =  action.payload
            return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
        },
        anecdoteSet(state, action) {
            return action.payload
        },
        anecdoteAdd(state, action) {
            state.push(action.payload)
        }
    }
})

export const anecdotesInit = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(anecdoteSet(anecdotes))
    }
}

export const anecdoteCreate = anecdote => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(anecdote)
        dispatch(anecdoteAdd(newAnecdote))
    }
}

export const anecdoteVote = id => {
    return async dispatch => {
        const anecdote = await anecdoteService.getAnecdote(id)
        const updateAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        const updatedAnecdote = await anecdoteService.update(updateAnecdote)
        dispatch(anecdoteUpdate(updatedAnecdote))
    }
}


export const { anecdoteSet, anecdoteAdd, anecdoteUpdate } = anecdoteSlice.actions
export default anecdoteSlice.reducer

/*
const anecdotesInit = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteAsObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesInit.map(anecdoteAsObject)

const reducer = (state = initialState, action) => {
    console.log('state now:', state)
    console.log('action:', action)

    switch(action.type) {
        case 'NEW':
            return state.concat(action.payload)
        case 'VOTE':
            const id = action.payload.id
            const anecdoteVote = state.find(anecdote => anecdote.id === id)
            const updatedAnecdote = {
                ...anecdoteVote,
                votes: anecdoteVote.votes + 1
            }

            return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    }

    return state
}

export const anecdoteVote = (id) => {
    return {
        type: 'VOTE',
        payload: { id }
    }
}

export const anecdoteCreate = (content) => {
    return {
        type: 'NEW',
        payload: anecdoteAsObject(content)
    }
}

export default reducer
*/
