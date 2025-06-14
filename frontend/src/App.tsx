import { useEffect, useState } from 'react'

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetch('/api/todos/')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App