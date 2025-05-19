import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { useMemo, useState } from "react"
import { createPortal } from "react-dom"

import PlusIcon from "./PlusIcon"
import ColumnContainer from "./ColumnContainer"

import type { Column, Columns, UpdateColumn, DeleteColumn, CreateColumn, UpdateColumnOrderEvent } from "../types/column"
import type { CreateTask, DeleteTask, Task, Tasks, UpdateTask, UpdateTaskColumnEvent } from "../types/task"
import Card from "./Card"

const Board = ({ columns, tasks, createColumn, updateColumn, updateColumnOverEvent, deleteColumn, createTask, updateTask, updateTaskOverEvent, deleteTask }: {
    columns: Columns,
    tasks: Tasks,
    createColumn: CreateColumn,
    updateColumn: UpdateColumn,
    updateColumnOverEvent: UpdateColumnOrderEvent,
    deleteColumn:DeleteColumn,
    createTask: CreateTask,
    updateTask: UpdateTask,
    updateTaskOverEvent: UpdateTaskColumnEvent,
    deleteTask: DeleteTask
}) => {
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const columnIds = useMemo(() => columns.map((col) => col.id), [columns])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        })
    )

    const onDragEnd = (event: DragEndEvent) => {
       
        setActiveColumn(null)
        setActiveTask(null)
        
        const { active, over } = event

        if (!over) return

        const activeColumnId = active.id
        const overColumnId = over.id

        if (activeColumnId === overColumnId) return

        updateColumnOverEvent(activeColumnId, overColumnId)
    }

    const onDragStart = (event:DragStartEvent) => {
        
        if (event.active.data.current?.type === 'Column') {
            setActiveColumn(event.active.data.current.column)
            return
        }

        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task)
            return
        }
    }

    const onDragOver = (event:DragOverEvent) => {
        const { active, over } = event

        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === 'Task'
        const isOverTask = over.data.current?.type === 'Task'

        if (!activeTask) return

        if (isActiveTask && isOverTask) {
            updateTaskOverEvent(activeId, overId, false)
        }

        const isOverColumn = over.data.current?.type === 'Column'

        if (isActiveTask && isOverColumn) {
            updateTaskOverEvent(activeId, overId, true)
        }
    }

    return (
        <div>
            <button onClick={createColumn} className="flex gap-2 cursor-pointer rounded-lg p-2 m-2 border-2 bg-red-200 ring-rose-700 hover:ring-4">
                <PlusIcon />
                Add column
            </button>
            <div className="m-auto flex items-center overflow-x-auto overflow-y-hidden">
                <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                    <div className="m-3 flex gap-4">
                        <SortableContext items={columnIds}>
                            {columns.map((column) => (
                                <div key={column.id} className="flex gap-4">
                                    <ColumnContainer 
                                        column={column}
                                        deleteColumn={deleteColumn}
                                        updateColumn={updateColumn}
                                        createTask={createTask}
                                        tasks={tasks.filter(task => task.columnId === column.id)}
                                        deleteTask={deleteTask}
                                        updateTask={updateTask} 
                                    />
                                </div>
                            ))}
                        </SortableContext>
                    </div>
                    {createPortal(
                        <DragOverlay>
                            {activeColumn && (
                                <ColumnContainer 
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask} 
                                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                                />
                            )}
                            {activeTask && 
                                <Card 
                                    task={activeTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                            }
                        </DragOverlay>, document.body
                    )}
                </DndContext>
            </div>
        </div>
    )
}

export default Board