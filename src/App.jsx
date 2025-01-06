import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]); // default state is empty array
  const [isLoading, setIsLoading] = useState(true); // loading state

  const fetchData = async () => {
    console.log("Fetching data...");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    console.log("URL:", url);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Data:", data);

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }));
      console.log("Todos from Airtable:", todos);

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  const removeTodo = (id) => {
    setTodoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      {isLoading ? (
        <p>Loading...</p> // conditional loading indicator
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
