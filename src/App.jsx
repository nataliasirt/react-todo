import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import styles from "./App.module.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?sort[0][field]=title&sort[0][direction]=asc`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const todos = data.records
        .map((record) => ({
          title: record.fields.title,
          id: record.id,
        }))
        .sort((a, b) =>
          isAscending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );

      setTodoList(todos);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (newTodo) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const createdTodo = {
        title: data.fields.title,
        id: data.id,
      };
      setTodoList((prevTodoList) =>
        [...prevTodoList, createdTodo].sort((a, b) =>
          isAscending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        )
      );
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  const removeTodo = (id) => {
    setTodoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, [isAscending]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <button onClick={toggleSortOrder} className={styles.toggleButton}>
        Toggle Sort Order
      </button>
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
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
