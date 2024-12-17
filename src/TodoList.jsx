import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map((item) => (
        <li key={item.id}>
          <TodoListItem todo={item} onRemoveTodo={onRemoveTodo} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

