import React, { useState } from 'react';
import './Todo.css';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
                                         
  const handleAddOrUpdateTodo = () => {                                          
    if (editMode && editId !== null) {
      const updatedTodos = todos.map(todo =>
        todo.id === editId ? { ...todo, title: inputValue } : todo
      );
      setTodos(updatedTodos);
      setEditMode(false);
      setEditId(null);
      setInputValue('');
    } else {
      if (inputValue.trim() !== '') {
        const newTodo: TodoItem = {
          id: todos.length + 1,
          title: inputValue,
          completed: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
      }
    }
  };

  const handleEditTodo = (id: number, title: string) => {
    setEditMode(true);
    setEditId(id);
    setInputValue(title);
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder={editMode ? "Update todo" : "Enter todo"}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={handleAddOrUpdateTodo}>{editMode ? 'Update' : '+'}</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span className='todo-title'>{todo.title}</span>
            {todo.completed && <span className="completion-message">Completed</span>}
            <button className='edit-button' onClick={() => handleEditTodo(todo.id, todo.title)}>✏️</button>
            <button className='delete-button' onClick={() => handleDeleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
