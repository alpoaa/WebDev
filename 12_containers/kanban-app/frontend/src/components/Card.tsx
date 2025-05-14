import { useEffect, useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import type { Task, DeleteTask, UpdateTask } from "../types/task"

import DeleteIcon from "./DeleteIcon"
import LockIcon from "./LockIcon"
import UnlockIcon from "./UnlockIcon"

const Card = ({ task, deleteTask, updateTask }: {
    task: Task,
    deleteTask: DeleteTask,
    updateTask: UpdateTask
}) => {
    const [editMode, setEditMode] = useState(false)
    const [valueTask, setValueTask] = useState(task.task)
    const [valueDescription, setValueDescription] = useState(task.description)
    const [valueDueDate, setValueDueDate] = useState('')
    const [valueAssignTo, setValueAssignTo] = useState(task.assigned)

    useEffect(() => {
        if (task.dueDate) {
            const [day, month, year] = task.dueDate.split(".")
            setValueDueDate(`${year}-${month}-${day}`)
        }
    }, [task.dueDate])

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task
        },
        disabled: editMode
    })

    const style = {
            transition,
            transform: CSS.Transform.toString(transform)
    }

    const toggleEditMode = () => setEditMode((prev) => !prev)

    const submitUpdateTask = () => {
        const [year, month, day] = valueDueDate.split("-")
        let dueDate = ''

        if (year || month || day) {
            dueDate = `${day}.${month}.${year}`
        }

        const updatedTask: Task = {
            ...task,
            task: valueTask,
            description: valueDescription,
            assigned: valueAssignTo,
            dueDate
        }
        
        updateTask(updatedTask)
        toggleEditMode()
        
    }

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} className="opacity-40 border-yellow-300 bg-blue-100 rounded-xl border h-60 w-147"/>
        )
    }

    if (editMode) {
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <div className=" border rounded-xl p-2 m-4 border-yellow-300 bg-blue-100 cursor-grab items-center hover:ring-2 hover:ring-inset hover:ring-yellow-300">
                    <form onSubmit={submitUpdateTask}>
                        <div className="flex flex-col gap-2 m-2">
                            <label>Task:</label>
                            <input autoFocus value={valueTask} onChange={(e) => setValueTask(e.target.value)}className="border p-2 rounded-md"/>
                        </div>
                        <div className="flex flex-col gap-2 m-2">
                            <label>Additional details:</label>
                            <input value={valueDescription} onChange={(e) => setValueDescription(e.target.value)} className="border p-2 rounded-md"/>
                        </div>
                        <div className="flex flex-col gap-2 m-2">
                            <label>Due date:</label>
                            <input type="date" value={valueDueDate} onChange={(e) => setValueDueDate(e.target.value)} className="border p-2 rounded-md"/>
                        </div>
                        <div className="flex flex-col gap-2 m-2">
                            <label>Assign to:</label>
                            <input value={valueAssignTo} onChange={(e) => setValueAssignTo(e.target.value)} className="border p-2 rounded-md"/>
                        </div>
                        <button type="submit" className=" m-2 rounded stroke-gray-700 hover:stroke-white hover:bg-lime-700 hover:cursor-pointer">
                            <UnlockIcon />
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex border rounded-xl p-2 m-2 justify-between border-yellow-300 bg-blue-100 cursor-grab items-center hover:ring-2 hover:ring-inset hover:ring-yellow-300">
            <div>
                <div className="text-xl">
                    {task.task}
                </div>
                <div className="text-sm">
                    <div>
                        {task.description}
                    </div>
                    <div>
                        Due: {task.dueDate}
                    </div>
                    <div>
                        Assigned to: {task.assigned}
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <button onClick={() => deleteTask(task.id)} className="rounded stroke-gray-700 hover:stroke-white hover:bg-lime-700 hover:cursor-pointer">
                    <DeleteIcon />
                </button>
                <button onClick={toggleEditMode} className="rounded stroke-gray-700 hover:stroke-white hover:bg-lime-700 hover:cursor-pointer">
                    <LockIcon />
                </button>
            </div>
        </div>
    )
}

export default Card 