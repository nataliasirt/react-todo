import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  return (
    <div>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            <TodoListItem todo={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;


