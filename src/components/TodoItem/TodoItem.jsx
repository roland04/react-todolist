import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className="todo-item list-group-item d-flex">
            <div class="form-check me-5">
                <input
                    id={`complete-todo-${todo.id}`}
                    type="checkbox"
                    className="form-check-input"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    />
                <label htmlFor={`complete-todo-${todo.id}`} className="form-check-label" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.text}
                </label>
            </div>
            <button className="btn btn-sm btn-light ms-auto" onClick={() => onDelete(todo.id)}>
                <i class="bi bi-trash3 text-danger"></i>
            </button>
        </li>
    );
}
