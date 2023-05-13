'use client'
import { useTransition } from 'react'

export const TodoItem = ({
  todo,
  deleteTodo,
  value,
  setTitle,
  setIsUpdated,
}) => {
  const [isPending, startTransition] = useTransition()

  return (
    <li
      key={todo.id}
      className="flex items-center justify-between space-x-2 w-full px-4 py-2 border-b bg-slate-700 text-white"
    >
      <div className="items-center">
        <input
          type="checkbox"
          onClick={() => {
            startTransition(() => {
              deleteTodo(todo.id)
            })
          }}
        />
        <span className="ml-3">{todo.title}</span>
      </div>
      <button
        className="px-3 py-1 bg-purple-300 rounded-md right-4"
        onClick={() => {
          setTitle(value)
          setIsUpdated(true)
        }}
      >
        Edit
      </button>
    </li>
  )
}
