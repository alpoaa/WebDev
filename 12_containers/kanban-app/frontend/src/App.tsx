import { useState, useEffect } from 'react'

import './App.css'
import Board from './components/Board'
import taskService from  './services/tasks'
import columnService from './services/columns'

import type { Column, Columns, ColumnId, NewColumn } from './types/column'
import type { NewTask, Task, Tasks, TaskId } from './types/task'
import { type NotificationType } from './types/notification'
import Notification from './components/Notification'
import { arrayMove } from '@dnd-kit/sortable'
import type { UniqueIdentifier } from '@dnd-kit/core'

const App = () => {
  const [columns, setColumns] = useState<Columns>([])
  const [tasks, setTasks] = useState<Tasks>([])
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState<NotificationType>(null)
  
  useEffect(() => {
    try { 
      columnService //http:localhost:3001/columns
        .getAllColumns()
        .then(data => {
          if (data) {
            setColumns(data)
          }
        })
        .catch(exception => {
          sendNotification(exception, 'error')
        })
      } catch (exception) {
        sendNotification(`${exception}`, 'error')
      }
    
    taskService //http:localhost:3001/tasks
        .getAllTasks()
        .then(data => {
          if (data) {
            setTasks(data)
          }
        })
        .catch(exception => {
          sendNotification(exception, 'error')
        })
  }, [])
  
  const sendNotification = (message: string, type: NotificationType) => {
    setNotification(message)
    setNotificationType(type)

    setTimeout(() => {
      setNotification('')
      setNotificationType(null)
    }, 3000)
  }

  const createNewColumn = async() => {
    try {
      const newColumnObj: NewColumn = { title: 'New Column' }
      const createdColumn: Column = await columnService.createColumn(newColumnObj)
      setColumns(columns.concat(createdColumn))
    } catch (exception ) {
      sendNotification(`Error raised while trying to create new column. ${exception}`, 'error')
    }
  }

  const updateColumn = async(columnId: ColumnId, title: string) => {
    try {
      const updateColumnObj: NewColumn = { title }
      const updatedColumn: Column = await columnService.updateColumn(updateColumnObj, columnId)
      const newColumns = columns.map(column => column.id === columnId ? updatedColumn : column)
      setColumns(newColumns)

    } catch (exception) {
      sendNotification(`Error raised while trying to update column. ${exception}`, 'error')
    }
  }

  const updateColumnOver = (activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
    setColumns(columns => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId)
      const overColumnIndex = columns.findIndex((col) => col.id === overId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  const deleteColumn = async(columnId: ColumnId) => {
    try {
      await columnService.deleteColumn(columnId)
      const newColumns = columns.filter(column => column.id !== columnId)
      setColumns(newColumns)
      
      const tasksIdDelete = tasks.filter(task => task.columnId === columnId).map(task => task.id)
      for (const id of tasksIdDelete) {
        deleteTask(id)
      }
      
     const newTasks = tasks.filter(task => task.columnId !== columnId)
     setTasks(newTasks)

    } catch (exception) {
      sendNotification(`Error raised while trying to delete column. ${exception}`, 'error')
    }
  }

  const createNewTask = async(columnId: ColumnId) => {
    try {
      const currentDate = new Date()
      currentDate.setMonth(currentDate.getMonth() + 1)

      const dueDateYear = currentDate.getFullYear()
      const dueDateMonth = String(currentDate.getMonth() + 1).padStart(2, "0")
      const dueDateDate = String(currentDate.getDate()).padStart(2, "0")
      const dueDate = `${dueDateDate}.${dueDateMonth}.${dueDateYear}`

      const newTaskObj: NewTask = {
        columnId,
        task: 'New task',
        dueDate,
        assigned: '',
        description: ''
      }

      const createdTask: Task = await taskService.createTask(newTaskObj)
      setTasks(tasks.concat(createdTask))

    } catch (exception) {
      sendNotification(`Error raised while trying to create new task. ${exception}`, 'error')
    } 
    
  }

  const updateTask = async(task: Task) => {
      const updateTask: Task = {
        ...task,
        task: task.task,
        description: task.description,
        assigned: task.assigned,
        dueDate: task.dueDate,
        columnId: task.columnId
      }

      const updatedTask: Task = await taskService.updateTask(updateTask, task.id)
      const newTasks = tasks.map(t => t.id === updateTask.id ? updatedTask : t)
      setTasks(newTasks)
  }

  const updateTaskOver = async(activeId: UniqueIdentifier, overId: UniqueIdentifier | ColumnId, isOverColumn: boolean) => {
    if (isOverColumn) {
      // when task is changed to different column

      if (activeId) {
        setTasks(tasks => {
          const activeIdx = tasks.findIndex(task => task.id === activeId)

          tasks[activeIdx].columnId = overId

          return arrayMove(tasks, activeIdx, activeIdx)
        })
        
        const updatedTask = tasks.find(task => task.id === activeId)
  
        if (updatedTask) {
          updateTask(updatedTask)
        }
        
      }
    } else {
      // when task orders are changed inside same column 
      setTasks(tasks => {
        const activeIdx = tasks.findIndex(task => task.id === activeId)
        const overIdx = tasks.findIndex(task => task.id === overId)

        tasks[activeIdx].columnId = tasks[overIdx].columnId

        return arrayMove(tasks, activeIdx, overIdx)
      })
    }
  }

  const deleteTask = async(taskId: TaskId) => {
    try {
      await taskService.deleteTask(taskId)
      const newTasks = tasks.filter(task => task.id !== taskId)
      setTasks(newTasks)

    } catch {
      sendNotification(`Error raised while trying to delete task. Task not exists in the database.`, 'error')
    }
  }

  return (
    <>
      <Notification notification={notification} type={notificationType} />
      <Board 
        columns={columns}
        tasks={tasks}
        createColumn={createNewColumn}
        updateColumn={updateColumn}
        updateColumnOverEvent={updateColumnOver}
        deleteColumn={deleteColumn}
        createTask={createNewTask}
        updateTask={updateTask}
        updateTaskOverEvent={updateTaskOver}
        deleteTask={deleteTask}
      />
    </>
  )
}

export default App
