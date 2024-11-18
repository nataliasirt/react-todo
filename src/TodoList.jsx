import TodoListItem from './TodoListItem';


function TodoList({ todos }) {
  return (
    <div>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <TodoListItem todo={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}


export default TodoList;


