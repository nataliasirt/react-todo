import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (!todoTitle.trim()) {
      alert("Please enter a valid todo title.");
      return;
    }
    if (onAddTodo) {
      onAddTodo({
        title: todoTitle,
        id: Date.now().toString(),
      });
    }
    setTodoTitle(""); // Reset input
  };

  return (
    <form onSubmit={handleAddTodo}className={styles.form}>
     <div className={styles.inputGroup}>
      <InputWithLabel
        label="Title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;