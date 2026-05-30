/**
 * Vanilla JS Todo App
 * Day 1 — JavaScript Challenge
 * Author: devashmit
 */

// ── State ─────────────────────────────────────────────────────────────────────
const STORAGE_KEY = "devashmit-todos";

let todos = loadTodos();
let currentFilter = "all";

// ── DOM refs ──────────────────────────────────────────────────────────────────
const addForm       = document.getElementById("addForm");
const todoInput     = document.getElementById("todoInput");
const todoList      = document.getElementById("todoList");
const itemCount     = document.getElementById("itemCount");
const clearBtn      = document.getElementById("clearCompleted");
const filterBtns    = document.querySelectorAll(".filter-btn");

// ── Persistence ───────────────────────────────────────────────────────────────
function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getFilteredTodos() {
  if (currentFilter === "active")    return todos.filter(t => !t.completed);
  if (currentFilter === "completed") return todos.filter(t => t.completed);
  return todos;
}

function activeCount() {
  return todos.filter(t => !t.completed).length;
}

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  const filtered = getFilteredTodos();

  todoList.innerHTML = "";

  filtered.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;

    li.innerHTML = `
      <div
        class="todo-item__checkbox ${todo.completed ? "checked" : ""}"
        role="checkbox"
        aria-checked="${todo.completed}"
        aria-label="Mark as ${todo.completed ? "incomplete" : "complete"}"
        tabindex="0"
      ></div>
      <span class="todo-item__text ${todo.completed ? "completed" : ""}">${escapeHtml(todo.text)}</span>
      <button class="todo-item__delete" aria-label="Delete todo" title="Delete">✕</button>
    `;

    todoList.appendChild(li);
  });

  // Update footer
  const count = activeCount();
  itemCount.textContent = `${count} item${count !== 1 ? "s" : ""} left`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ── Event: Add todo ───────────────────────────────────────────────────────────
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, completed: false });
  saveTodos();
  render();
  todoInput.value = "";
  todoInput.focus();
});

// ── Event: Toggle + Delete (event delegation on list) ────────────────────────
todoList.addEventListener("click", (e) => {
  const item = e.target.closest(".todo-item");
  if (!item) return;
  const id = Number(item.dataset.id);

  if (e.target.classList.contains("todo-item__checkbox") ||
      e.target.classList.contains("todo-item__text")) {
    // Toggle complete
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos();
      render();
    }
  }

  if (e.target.classList.contains("todo-item__delete")) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    render();
  }
});

// Keyboard support for checkboxes
todoList.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (e.target.classList.contains("todo-item__checkbox")) {
      e.target.click();
    }
  }
});

// ── Event: Filter buttons ─────────────────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach(b => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn);
    });
    render();
  });
});

// ── Event: Clear completed ────────────────────────────────────────────────────
clearBtn.addEventListener("click", () => {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  render();
});

// ── Initial render ────────────────────────────────────────────────────────────
render();
