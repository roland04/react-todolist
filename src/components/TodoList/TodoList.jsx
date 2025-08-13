import React, { useState, useEffect } from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import { createTodoItem } from "../../models/todoItem";


export default function TodoList() {
    const [todos, setTodos] = useState(() =>
        JSON.parse(localStorage.getItem("todos")) || [
            createTodoItem({ id: 1, text: "Forge a new sword" }),
            createTodoItem({ id: 3, text: "Gather herbs for potion" }),
            createTodoItem({ id: 4, text: "Escort the merchant caravan" }),
            createTodoItem({ id: 7, text: "Scout the forest for bandits" }),
            createTodoItem({ id: 9, text: "Study ancient runes" }),
        ]
    );
    const [input, setInput] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleAddTodo(e) {
        e.preventDefault();
        const text = input.trim();
        if (!text) return;
        setTodos([
            ...todos,
            createTodoItem({ id: Date.now(), text })
        ]);
        setInput("");
    }

    function handleToggle(id) {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id ? {
                    ...todo,
                    completed: !todo.completed,
                    completedAt: !todo.completed ? new Date().toISOString() : null
                } : todo
            )
        );
    }

    function handleDelete(id) {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    return (
        <section className="d-flex flex-column h-100">
            <form onSubmit={handleAddTodo}>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="New task"
                    />
                    <button type="submit" className="btn btn-primary">
                        <i class="bi bi-plus-lg"></i></button>
                </div>
            </form>
            <ul className="list-group list-group-flush">
                {todos.filter(todo => !todo.completed).map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
            {todos.filter(todo => todo.completed).length !== 0 && (
                <div className="mt-auto border-top">
                    <button className="btn btn-link d-inline-flex w-100 text-start text-body text-decoration-none m-1"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#completedTodos"
                            aria-expanded="false"
                            aria-controls="completedTodos"
                        >
                        <span className="me-2">
                            <i className="bi bi-chevron-down ms-2"></i>
                            <i className="bi bi-chevron-up ms-2"></i>
                        </span>
                        Completed ({todos.filter(todo => todo.completed).length})
                    </button>
                    <ul id="completedTodos" className="list-group list-group-flush">
                        {todos.filter(todo => todo.completed)
                            .slice()
                            .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
                            .map(todo => (
                                <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                                />
                            ))
                        }
                    </ul>
                </div>

            )}
        </section>
    );
}
