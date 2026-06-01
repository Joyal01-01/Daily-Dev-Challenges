/**
 * Real-time Search Filter with Highlighting
 * Day 3 — JavaScript Challenge
 * Author: devashmit
 */

// ── Data ──────────────────────────────────────────────────────────────────────
const COUNTRIES = [
  { name: "Afghanistan",          continent: "Asia"     },
  { name: "Albania",              continent: "Europe"   },
  { name: "Algeria",              continent: "Africa"   },
  { name: "Argentina",            continent: "Americas" },
  { name: "Australia",            continent: "Oceania"  },
  { name: "Austria",              continent: "Europe"   },
  { name: "Bangladesh",           continent: "Asia"     },
  { name: "Belgium",              continent: "Europe"   },
  { name: "Bolivia",              continent: "Americas" },
  { name: "Brazil",               continent: "Americas" },
  { name: "Cambodia",             continent: "Asia"     },
  { name: "Canada",               continent: "Americas" },
  { name: "Chile",                continent: "Americas" },
  { name: "China",                continent: "Asia"     },
  { name: "Colombia",             continent: "Americas" },
  { name: "Croatia",              continent: "Europe"   },
  { name: "Czech Republic",       continent: "Europe"   },
  { name: "Denmark",              continent: "Europe"   },
  { name: "Ecuador",              continent: "Americas" },
  { name: "Egypt",                continent: "Africa"   },
  { name: "Ethiopia",             continent: "Africa"   },
  { name: "Finland",              continent: "Europe"   },
  { name: "France",               continent: "Europe"   },
  { name: "Germany",              continent: "Europe"   },
  { name: "Ghana",                continent: "Africa"   },
  { name: "Greece",               continent: "Europe"   },
  { name: "Hungary",              continent: "Europe"   },
  { name: "India",                continent: "Asia"     },
  { name: "Indonesia",            continent: "Asia"     },
  { name: "Iran",                 continent: "Asia"     },
  { name: "Iraq",                 continent: "Asia"     },
  { name: "Ireland",              continent: "Europe"   },
  { name: "Israel",               continent: "Asia"     },
  { name: "Italy",                continent: "Europe"   },
  { name: "Japan",                continent: "Asia"     },
  { name: "Jordan",               continent: "Asia"     },
  { name: "Kenya",                continent: "Africa"   },
  { name: "Malaysia",             continent: "Asia"     },
  { name: "Mexico",               continent: "Americas" },
  { name: "Morocco",              continent: "Africa"   },
  { name: "Nepal",                continent: "Asia"     },
  { name: "Netherlands",          continent: "Europe"   },
  { name: "New Zealand",          continent: "Oceania"  },
  { name: "Nigeria",              continent: "Africa"   },
  { name: "Norway",               continent: "Europe"   },
  { name: "Pakistan",             continent: "Asia"     },
  { name: "Peru",                 continent: "Americas" },
  { name: "Philippines",          continent: "Asia"     },
  { name: "Poland",               continent: "Europe"   },
  { name: "Portugal",             continent: "Europe"   },
  { name: "Romania",              continent: "Europe"   },
  { name: "Russia",               continent: "Europe"   },
  { name: "Saudi Arabia",         continent: "Asia"     },
  { name: "South Africa",         continent: "Africa"   },
  { name: "South Korea",          continent: "Asia"     },
  { name: "Spain",                continent: "Europe"   },
  { name: "Sri Lanka",            continent: "Asia"     },
  { name: "Sweden",               continent: "Europe"   },
  { name: "Switzerland",          continent: "Europe"   },
  { name: "Tanzania",             continent: "Africa"   },
  { name: "Thailand",             continent: "Asia"     },
  { name: "Turkey",               continent: "Asia"     },
  { name: "Uganda",               continent: "Africa"   },
  { name: "Ukraine",              continent: "Europe"   },
  { name: "United Kingdom",       continent: "Europe"   },
  { name: "United States",        continent: "Americas" },
  { name: "Venezuela",            continent: "Americas" },
  { name: "Vietnam",              continent: "Asia"     },
  { name: "Zimbabwe",             continent: "Africa"   },
];

const CONTINENT_FLAGS = {
  Asia:     "🌏",
  Europe:   "🌍",
  Americas: "🌎",
  Africa:   "🌍",
  Oceania:  "🌏",
};

// ── State ─────────────────────────────────────────────────────────────────────
let query        = "";
let activeFilter = "all";
let debounceTimer = null;

// ── DOM refs ──────────────────────────────────────────────────────────────────
const searchInput  = document.getElementById("searchInput");
const resultsList  = document.getElementById("resultsList");
const resultCount  = document.getElementById("resultCount");
const chips        = document.querySelectorAll(".chip");

// ── Highlight matched text ────────────────────────────────────────────────────
function highlight(text, term) {
  if (!term) return escapeHtml(text);
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex   = new RegExp(`(${escaped})`, "gi");
  return escapeHtml(text).replace(regex, "<mark>$1</mark>");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Filter + render ───────────────────────────────────────────────────────────
function render() {
  const q = query.toLowerCase().trim();

  const filtered = COUNTRIES.filter((c) => {
    const matchesQuery     = c.name.toLowerCase().includes(q);
    const matchesContinent = activeFilter === "all" || c.continent === activeFilter;
    return matchesQuery && matchesContinent;
  });

  resultsList.innerHTML = "";

  if (filtered.length === 0) {
    resultsList.innerHTML = `
      <li class="no-results" role="listitem">
        <span aria-hidden="true">🔎</span>
        No countries match "<strong>${escapeHtml(query)}</strong>"
      </li>`;
    resultCount.textContent = "0 results";
    return;
  }

  filtered.forEach((country) => {
    const li = document.createElement("li");
    li.className = "result-item";
    li.setAttribute("role", "listitem");
    li.innerHTML = `
      <span class="result-item__flag" aria-hidden="true">
        ${CONTINENT_FLAGS[country.continent] || "🌐"}
      </span>
      <span class="result-item__name">${highlight(country.name, query)}</span>
      <span class="result-item__continent">${country.continent}</span>
    `;
    resultsList.appendChild(li);
  });

  const total = COUNTRIES.length;
  resultCount.textContent = `${filtered.length} of ${total} countries`;
}

// ── Events ────────────────────────────────────────────────────────────────────
searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    query = e.target.value;
    render();
  }, 200); // 200ms debounce
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter;
    chips.forEach((c) => {
      c.classList.toggle("active", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    render();
  });
});

// ── Initial render ────────────────────────────────────────────────────────────
render();
