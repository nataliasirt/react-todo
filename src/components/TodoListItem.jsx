import styles from './TodoList.module.css';
import PropTypes from 'prop-types';

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

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;