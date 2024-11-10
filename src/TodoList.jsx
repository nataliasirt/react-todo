
const todoList = [
  { id: 1, title: "Complete this week assignment" },
  { id: 2, title: "Go shopping" },
  { id: 3, title: "Go to the gym" }
];

function TodoList() {
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;