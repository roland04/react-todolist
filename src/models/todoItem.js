export function createTodoItem({
    id,
    text,
    completed = false,
    createdAt = new Date().toISOString(),
    }) {
    return {
        id,
        text,
        completed,
        createdAt,
        completedAt: completed ? new Date().toISOString() : null,
    };
}
