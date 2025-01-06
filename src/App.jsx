import "./App.css";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]); // default state is empty array
  const [isLoading, setIsLoading] = useState(true); // loading state
