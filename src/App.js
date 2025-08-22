import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [
          { text: "Learn React", completed: false },
          { text: "Build a Todo App", completed: false },
          { text: "Testing", completed: false },
          { text: "Deployment", completed: false },
        ];
  });
  const inputRef = useRef();
  const addTodo = function () {
    const text = inputRef.current.value;
    if (text === "") return;
    const newItem = { text, completed: false };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
    inputRef.current.focus();
  };
  const toggleTodo = function (index) {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };
  const deleteTodo = function (index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="App">
      <div className="container">
        <h2>Todo List</h2>
        <ul>
          {todos.map(({ text, completed }, index) => {
            return (
              <li className={completed ? "done" : ""} key={index}>
                <span
                  className="circle"
                  onClick={() => toggleTodo(index)}
                ></span>
                <span className="text" onClick={() => toggleTodo(index)}>
                  {text}
                </span>
                <span
                  className="delete"
                  onClick={() => deleteTodo(index)}
                ></span>
              </li>
            );
          })}
        </ul>
        <input ref={inputRef} placeholder="Enter an item..."></input>
        <button onClick={addTodo}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
