"""
Todo CRUD API with Pydantic Validation — FastAPI
Day 1 — FastAPI Challenge
Author: devashmit

Endpoints:
  GET    /todos          — list all todos
  GET    /todos/{id}     — get a single todo
  POST   /todos          — create a new todo
  PUT    /todos/{id}     — update a todo
  DELETE /todos/{id}     — delete a todo
"""

from fastapi import FastAPI, HTTPException, status
from models import TodoCreate, TodoOut, TodoUpdate

app = FastAPI(title="Todo CRUD API", version="1.0.0")

# In-memory store — get the API design right before adding a database
_todos: dict[int, dict] = {}
_next_id = 1


def _get_or_404(todo_id: int) -> dict:
    if todo_id not in _todos:
        raise HTTPException(status_code=404, detail=f"Todo {todo_id} not found")
    return _todos[todo_id]


@app.get("/todos", response_model=list[TodoOut])
def list_todos():
    """Return all todos."""
    return list(_todos.values())


@app.get("/todos/{todo_id}", response_model=TodoOut)
def get_todo(todo_id: int):
    """Return a single todo by ID."""
    return _get_or_404(todo_id)


@app.post("/todos", response_model=TodoOut, status_code=status.HTTP_201_CREATED)
def create_todo(body: TodoCreate):
    """Create a new todo."""
    global _next_id
    todo = {"id": _next_id, **body.model_dump()}
    _todos[_next_id] = todo
    _next_id += 1
    return todo


@app.put("/todos/{todo_id}", response_model=TodoOut)
def update_todo(todo_id: int, body: TodoUpdate):
    """Update an existing todo. Only provided fields are changed."""
    todo = _get_or_404(todo_id)
    updates = body.model_dump(exclude_unset=True)
    todo.update(updates)
    return todo


@app.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int):
    """Delete a todo by ID."""
    _get_or_404(todo_id)
    del _todos[todo_id]
