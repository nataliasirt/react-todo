import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map((item) => (
        <li key={item.id}>
          <TodoListItem todo={item} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;



