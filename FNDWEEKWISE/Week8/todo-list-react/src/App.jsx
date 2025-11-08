import { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState(storedTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todoList));
  }, [todoList]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodoList([...todoList, newTask]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {todoList.length === 0 ? (
          <p className="empty">No tasks yet</p>
        ) : (
          todoList.map((item) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(item.id)}>{item.text}</span>
              <button className="delete" onClick={() => deleteTask(item.id)}>
                ✖
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
