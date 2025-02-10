import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <TodoListItem todo={item} onRemoveTodo={onRemoveTodo} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
