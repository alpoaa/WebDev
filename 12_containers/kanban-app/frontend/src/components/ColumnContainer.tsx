import { useMemo, useState } from "react"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import type { Column, DeleteColumn, UpdateColumn } from "../types/column"
import type { CreateTask, Tasks, DeleteTask, UpdateTask } from "../types/task"

import DeleteIcon from "./DeleteIcon"
import PlusIcon from "./PlusIcon"
import Card from "./Card"

const ColumnContainer = ({ column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask }: {
    column: Column,
    deleteColumn: DeleteColumn,
    updateColumn: UpdateColumn,
    createTask: CreateTask,
    tasks: Tasks,
    deleteTask: DeleteTask,
    updateTask: UpdateTask

}) => {

    const [editMode, setEditMode] = useState(false)

    const taskIds = useMemo(() => {
        return tasks.map((task) => task.id)   
    }, [tasks])

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        },
        disabled: editMode
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} className="bg-yellow-100 rounded-md flex flex-col opacity-40 border-2 border-yellow-300 w-150 h-200"/>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-yellow-100 rounded-md flex flex-col w-150 h-200">
            <div onClick={() => setEditMode(true)} className="bg-yellow-300 text-md cursor-grab rounded-md rounded-b-none font-bold p-3">
                <div className="flex gap-4 justify-between">
                    <div className="flex justify-center items-center text-sm rounded-full">
                        0
                    </div>
                    {!editMode && column.title}
                    {editMode && <input autoFocus onBlur={() => setEditMode(false)} value={column.title} onChange={(e) => updateColumn(column.id, e.target.value)} className="p-2"/>}
                    <button onClick={() => deleteColumn(column.id)} className="rounded stroke-gray-700 hover:stroke-white hover:bg-lime-700 hover:cursor-pointer">
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={taskIds}>   
                    {tasks.map((task) => (
                        <Card key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>
                    ))}
                </SortableContext>
            </div>
            <button onClick={() => createTask(column.id)}className="flex border-2 gap-2 items-center p-2 rounded-md bg-yellow-300 active:bg-yellow-100 hover:cursor-pointer">
                <PlusIcon />
                Add task
            </button>
        </div>
    )
}

export default ColumnContainer