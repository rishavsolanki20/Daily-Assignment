import React, { useState } from "react";
import "./TodoList.css";

export default function TodoList() {
  const [todo, setTodo] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  let globalId = todo.length;

  function addOrUpdateTodo() {
    if (editingTodo) {
      // If editingTodo is set, update the todo item
      const updatedTodos = todo.map((item) => {
        if (item.id === editingTodo.id) {
          return {
            ...item,
            title: document.getElementById("title").value,
            description: document.getElementById("desc").value,
          };
        }
        return item;
      });
      setTodo(updatedTodos);
      setEditingTodo(null);
    } else {
      // If editingTodo is not set, add a new todo item
      const newTodo = {
        id: globalId++,
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
      };
      setTodo([...todo, newTodo]);
    }
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
  }

  function editTodo(id) {
    const todoToEdit = todo.find((item) => item.id === id);
    setEditingTodo(todoToEdit);
    document.getElementById("title").value = todoToEdit.title;
    document.getElementById("desc").value = todoToEdit.description;
  }

  function deleteTodo(id) {
    setTodo(todo.filter((todo) => todo.id !== id));
  }

  return (
    <div className="container">
      <h1 className="heading">Todo List</h1>
      <div className="form">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" />
        <br />
        <label htmlFor="desc">Description</label>
        <input id="desc" type="text" />
        <br />
        <button className="button" onClick={addOrUpdateTodo}>
          {editingTodo ? "Edit Todo" : "Add Todo"}
        </button>
      </div>

      <div className="todos">
        {todo.map((todoItem, index) => (
          <div key={index} className="todo-item">
            <h2 className="todo-title">{todoItem.title}</h2>
            <p className="todo-description">{todoItem.description}</p>
            <button className="button" onClick={() => editTodo(todoItem.id)}>
              Edit
            </button>
            <button className="button" onClick={() => deleteTodo(todoItem.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
