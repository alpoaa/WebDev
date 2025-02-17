const noteReducer = (state = [], action) => {
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
            return false
    }
}

export default noteReducer