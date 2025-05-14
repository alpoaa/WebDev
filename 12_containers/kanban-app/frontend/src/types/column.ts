export type Id = string | number

export type Column = {
    id: Id,
    title: string
}

export type DeleteColumn = (id: Id) => void 
export type UpdateColumn = (columnId: Id, title: string) => void