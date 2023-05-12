// import Image from 'next/image'
import { AddTodoForm } from './components/AddTodoForm'
import { TodoItem } from './components/TodoItem'
// import * as TodoApi from './utils/api-utils/todo-api'
import { revalidatePath } from 'next/cache'

export default async function HomePage() {
  const API_PATH = 'http://127.0.0.1:3000/api/todos'

  const getTodos = async () => {
    'use server'
    return await (
      await fetch(API_PATH, {
        next: {
          revalidate: 0,
        },
      })
    ).json()
  }

  const deleteTodo = async (id) => {
    'use server'
    return await fetch(`${API_PATH}?id=${id}`, {
      next: {
        revalidate: 0,
      },
      method: 'DELETE',
    })
  }

  const addTodo = async (title) => {
    'use server'
    return await fetch(API_PATH, {
      next: {
        revalidate: 0,
      },
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  const todos = await getTodos()

  const addNewTodo = async (title) => {
    'use server'
    await addTodo(title)
    revalidatePath('/')
  }

  const delTodo = async (id) => {
    'use server'
    await deleteTodo(id)
    revalidatePath('/')
  }

  return (
    <div className="w-[400px] max-w-[97%] mx-auto flex flex-col items-center justify-center min-h-screen py-2">
      <AddTodoForm addNewTodo={addNewTodo} />
      <ul className="w-full flex flex-col space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={delTodo} />
        ))}
      </ul>
    </div>
  )
}
