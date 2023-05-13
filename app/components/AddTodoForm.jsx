'use client'
import { useState, useTransition } from 'react'
import { TodoItem } from './TodoItem'

export const AddTodoForm = ({ todos, deleteTodo, addNewTodo }) => {
  const [title, setTitle] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isUpdated, setIsUpdated] = useState(false)

  return (
    <>
      <form
        className="w-full flex mb-10"
        // onSubmit={(e) => {
        //   e.preventDefault()

        //   if (title.trim().length === 0) {
        //     return
        //   }

        //   startTransition(() => {
        //     addNewTodo(title)
        //   })

        //   setTitle('')
        // }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full px-4 py-2 border-b bg-slate-500"
        />
        {isUpdated ? (
          <button
            type="submit"
            className="block px-4 py-2 border-b bg-slate-700 ml-1 text-white"
          >
            Update
          </button>
        ) : (
          <button
            className="block px-4 py-2 border-b bg-slate-700 ml-1 text-white"
            onClick={(e) => {
              e.preventDefault()

              if (title.trim().length === 0) {
                return
              }

              startTransition(() => {
                addNewTodo(title)
              })

              setTitle('')
            }}
          >
            Add
          </button>
        )}
      </form>
      <ul className="w-full flex flex-col space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            value={todo.title}
            deleteTodo={deleteTodo}
            setTitle={setTitle}
            setIsUpdated={setIsUpdated}
          />
        ))}
      </ul>
    </>
  )
}
