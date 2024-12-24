import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]); // default state is empty array
  const [isLoading, setIsLoading] = useState(true); // loading state
  // simulate asynchronous data fetching
  useEffect(() => {
    const fetchTodos = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
          },
        });
      }, 2000); // simulate 2-second delay
    });
    fetchTodos
      .then((result) => {
        setTodoList(result.data.todoList); // update state with fetched data
        setIsLoading(false); // to turn off loading
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

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
