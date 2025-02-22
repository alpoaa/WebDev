import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    }
]

const generateId = () => Number((Math.random() * 100000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
      createNote(state, action) {
        //service takes care of correct creation
        /*
        const newNote = {
            content: action.payload,
            important: false,
            //id: generateId()
        }
        */
        state.push(action.payload)
      },
      toggleImportanceOf(state, action) {
        const id = action.payload
        const noteToChange = state.find(n => n.id === id)
        const changedNote = { 
          ...noteToChange, 
          important: !noteToChange.important 
        }
        return state.map(note =>
          note.id !== id ? note : changedNote 
        )     
      },
      appendNote(state, action) {
        state.push(action.payload)
      },
      setNotes(state, action) {
        return action.payload
      }
    }
  })
  
  export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
  export default noteSlice.reducer
/*
const noteReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_NOTE':
            //return state.concat(action.payload)
            return [...state, action.payload]
        case 'TOGGLE_IMPORTANCE':
            const id = action.payload.id
            const updateNote  = state.find(note => note.id === id)
            const changedNote = {
                ...updateNote,
                important: !updateNote.important
            }

            return state.map(note => note.id !== id ? note : changedNote)
        default:
            return state
    }
}


export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}

export default noteReducer
*/