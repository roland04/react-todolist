import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { createTodoItem } from "../../models/todoItem";


export default function TodoList() {
    const [todos, setTodos] = useState([
        createTodoItem({ id: 1, text: "Forge a new sword" }),
        createTodoItem({ id: 2, text: "Train with the archers" }),
        createTodoItem({ id: 3, text: "Gather herbs for potion" }),
        createTodoItem({ id: 4, text: "Escort the merchant caravan" }),
        createTodoItem({ id: 5, text: "Attend the king's council" }),
        createTodoItem({ id: 6, text: "Repair the castle walls" }),
        createTodoItem({ id: 7, text: "Scout the forest for bandits" }),
        createTodoItem({ id: 8, text: "Prepare feast for nobility" }),
        createTodoItem({ id: 9, text: "Study ancient runes" }),
        createTodoItem({ id: 10, text: "Practice horseback riding" }),
    ]);
    const [input, setInput] = useState("");

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
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
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
            <ul className="list-group">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
        </section>
    );
}
