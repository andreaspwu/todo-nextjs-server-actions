'use client'
import { useTransition } from 'react'

export const TodoItem = ({ todo, deleteTodo }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <li
      key={todo.id}
      className="flex items-center space-x-2 w-full px-4 py-2 border-b bg-slate-700 text-white"
    >
      <input
        type="checkbox"
        onClick={() => {
          startTransition(() => {
            deleteTodo(todo.id)
          })
        }}
      />
      <span>{todo.title}</span>
    </li>
  )
}
