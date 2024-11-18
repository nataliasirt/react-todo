import './App.css';
import { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Make breakfast for everybody' },
    { id: '2', title: 'Get grocieries from Trader Joe' }
  ]);

  const addTodo = (title) => {
    const newTodo = { id: Date.now().toString(), title };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
