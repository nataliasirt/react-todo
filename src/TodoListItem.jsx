function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <span>
      {todo.title} <button type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </span>
  );
}

export default TodoListItem;
