
  const todoList = [
      { id: 1, title: "Complete week 1 assignment" },
      { id: 2, title: "Go shopping" },
      { id: 3, title: "Go to the gym" }
    ];
    function App() {
    return (
      <div>
      <h1>Todo List</h1>
      <ul>
      {todoList.map((todo) => (
      <li key={todo.id}>{todo.title} </li>

      ))}

      </ul>
    </div>
    )
  }
  export default App
