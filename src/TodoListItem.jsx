import styles from './TodoList.module.css';
function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <span>
      {todo.title}{' '}
      <button
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
        className={styles.removeButton}
      >
        Remove
      </button>
    </span>
  );
}

export default TodoListItem;
