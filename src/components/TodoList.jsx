import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import PropTypes from 'prop-types';

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

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;