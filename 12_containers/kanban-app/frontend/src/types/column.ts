import type { UniqueIdentifier } from "@dnd-kit/core"

export type ColumnId = string | UniqueIdentifier

export type Column = {
    id: ColumnId,
    title: string
}

export type NewColumn = {
    title: string
}

export type Columns = Column[]
export type CreateColumn = () => void
export type DeleteColumn = (id: ColumnId) => void 
export type UpdateColumn = (columnId: ColumnId, title: string) => void
export type UpdateColumnOrderEvent = (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void