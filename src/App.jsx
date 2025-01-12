import './App.css';
import { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Airtable API Response:', data);

      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));
      console.log('Transformed Todos:', todos);

      setTodoList(todos);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (newTodo) => {
    console.log('Adding new todo:', newTodo);

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from Airtable POST:', data);

      const createdTodo = {
        title: data.fields.title,
        id: data.id,
      };
      console.log('Created Todo:', createdTodo);

      setTodoList((prevTodoList) => [...prevTodoList, createdTodo]);
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const removeTodo = (id) => {
    console.log('Removing todo with id:', id);
    setTodoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </div>
  );
}

export default App;
