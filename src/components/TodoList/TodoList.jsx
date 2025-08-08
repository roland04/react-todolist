import React, { useState, useEffect } from "react";
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
        <section>
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
            <ul className="list-group list-group-flush mb-5">
                {todos.filter(todo => !todo.completed).map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
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
        </section>
    );
}
