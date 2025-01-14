import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]); // default state is empty array
  const [isLoading, setIsLoading] = useState(true); // loading state
   // Async function to fetch data from Airtable
   const fetchData = async () => {
    const options = {
      method: "GET",
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
      console.log("Airtable API Response:", data); // Print the API response
      
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));
      console.log("Todos:", todos); // Print the transformed todos

      setTodoList(todos); // Update state with fetched todos
      setIsLoading(false); // Turn off loading indicator
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData inside useEffect
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
        <p>Loading...</p> // Conditional loading indicator
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
