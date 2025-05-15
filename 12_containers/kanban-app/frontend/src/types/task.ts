import type { UniqueIdentifier } from "@dnd-kit/core"

import type { ColumnId } from "./column"

export type TaskId = string

export type Task = {
    id: TaskId,
    columnId: ColumnId,
    task: string
    description?: string,
    assigned?: string,
    dueDate: string
}

export type NewTask = {
    columnId: ColumnId,
    task: string,
    description?: string,
    assigned?: string,
    dueDate: string
}

export type CreateTask = (columnId: ColumnId) => void
export type DeleteTask = (taskId: TaskId) => void
export type UpdateTask = (task: Task) => void
export type Tasks = Task[]
export type UpdateTaskColumnEvent = (activeId: UniqueIdentifier, overId: UniqueIdentifier, isOverColumn: boolean) => void