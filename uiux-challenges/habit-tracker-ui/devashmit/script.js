/**
 * Habit Tracker UI
 * Day 3 — UI/UX Challenge
 * Author: devashmit
 */

const HABITS = [
  { id: 1, name: "Morning Run",    emoji: "🏃", streak: 5,  target: 7, done: false },
  { id: 2, name: "Read 30 mins",   emoji: "📚", streak: 12, target: 7, done: true  },
  { id: 3, name: "Drink 2L Water", emoji: "💧", streak: 3,  target: 7, done: false },
  { id: 4, name: "Meditate",       emoji: "🧘", streak: 7,  target: 7, done: true  },
  { id: 5, name: "No Social Media",emoji: "📵", streak: 2,  target: 7, done: false },
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const today = new Date().getDay(); // 0=Sun

// ── Week row ──────────────────────────────────────────────────────────────────
function renderWeek() {
  const row = document.getElementById("weekRow");
  DAYS.forEach((label, i) => {
    const isToday    = i === today;
    const isPast     = i < today;
    const isComplete = isPast && Math.random() > 0.3; // simulate past completions

    const div = document.createElement("div");
    div.className = `day-cell ${isToday ? "day-cell--today" : ""} ${isComplete ? "day-cell--done" : ""}`;
    div.setAttribute("role", "listitem");
    div.setAttribute("aria-label", `${label}${isToday ? " (today)" : ""}${isComplete ? " completed" : ""}`);
    div.innerHTML = `
      <span class="day-cell__label">${label}</span>
      <span class="day-cell__dot" aria-hidden="true"></span>
    `;
    row.appendChild(div);
  });
}

// ── Progress ring (SVG) ───────────────────────────────────────────────────────
function progressRing(pct, color) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return `
    <svg class="ring" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="${r}" fill="none" stroke="#252840" stroke-width="4"/>
      <circle cx="22" cy="22" r="${r}" fill="none" stroke="${color}"
        stroke-width="4" stroke-linecap="round"
        stroke-dasharray="${dash} ${circ}"
        transform="rotate(-90 22 22)"/>
    </svg>`;
}

// ── Habits list ───────────────────────────────────────────────────────────────
function renderHabits() {
  const list = document.getElementById("habitsList");
  list.innerHTML = "";

  HABITS.forEach((habit) => {
    const pct   = Math.round((habit.streak / habit.target) * 100);
    const color = habit.done ? "#4ade80" : "#6366f1";

    const li = document.createElement("li");
    li.className = `habit-item ${habit.done ? "habit-item--done" : ""}`;
    li.setAttribute("role", "listitem");
    li.innerHTML = `
      <button
        class="habit-check"
        data-id="${habit.id}"
        aria-label="${habit.done ? "Mark incomplete" : "Mark complete"}: ${habit.name}"
        aria-pressed="${habit.done}"
      >
        ${habit.done ? "✓" : ""}
      </button>
      <span class="habit-emoji" aria-hidden="true">${habit.emoji}</span>
      <div class="habit-info">
        <p class="habit-name">${habit.name}</p>
        <p class="habit-streak">🔥 ${habit.streak}-day streak</p>
      </div>
      <div class="habit-ring" aria-label="${pct}% complete">
        ${progressRing(pct, color)}
        <span class="ring-pct">${pct}%</span>
      </div>
    `;
    list.appendChild(li);
  });

  // Toggle done on tap
  list.querySelectorAll(".habit-check").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id    = Number(btn.dataset.id);
      const habit = HABITS.find((h) => h.id === id);
      if (habit) {
        habit.done = !habit.done;
        renderHabits();
      }
    });
  });
}

// ── Bottom nav ────────────────────────────────────────────────────────────────
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach((b) => {
      b.classList.remove("active");
      b.removeAttribute("aria-current");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-current", "page");
  });
});

// ── Init ──────────────────────────────────────────────────────────────────────
renderWeek();
renderHabits();
