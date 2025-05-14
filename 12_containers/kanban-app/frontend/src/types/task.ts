export type Id = string | number

export type Task = {
    id: Id,
    columnId: Id,
    task: string
    description?: string,
    assigned: string,
    dueDate: string
}

export type CreateTask = (id: Id) => void
export type DeleteTask = (id: Id) => void
export type UpdateTask = (task: Task) => void
export type Tasks = Task[]