/**
 * Infinite Scroll Gallery — Unsplash API
 * Day 2 — JavaScript Challenge
 * Author: devashmit
 */

// ── Config ──────────────────────────────────────────────────────────────────
const CONFIG = {
  accessKey: "YOUR_UNSPLASH_ACCESS_KEY", // Replace with your key from unsplash.com/developers
  perPage: 12,
  endpoint: "https://api.unsplash.com/photos",
};

// ── State ────────────────────────────────────────────────────────────────────
let currentPage = 1;
let isFetching = false;

// ── DOM refs ─────────────────────────────────────────────────────────────────
const gallery = document.getElementById("gallery");
const spinner = document.getElementById("spinner");
const sentinel = document.getElementById("sentinel");

// ── Fetch photos from Unsplash ────────────────────────────────────────────────
async function fetchPhotos(page) {
  const url = new URL(CONFIG.endpoint);
  url.searchParams.set("page", page);
  url.searchParams.set("per_page", CONFIG.perPage);
  url.searchParams.set("client_id", CONFIG.accessKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// ── Render a batch of photos ──────────────────────────────────────────────────
function renderPhotos(photos) {
  photos.forEach((photo) => {
    const item = document.createElement("div");
    item.className = "gallery__item";

    const img = document.createElement("img");
    img.src = photo.urls.regular;
    img.alt = photo.alt_description || "Unsplash photo";
    img.loading = "lazy";
    img.addEventListener("load", () => img.classList.add("loaded"));

    const caption = document.createElement("div");
    caption.className = "gallery__item__caption";
    caption.textContent = `📷 ${photo.user.name}`;

    item.appendChild(img);
    item.appendChild(caption);
    gallery.appendChild(item);
  });
}

// ── Load next page ────────────────────────────────────────────────────────────
async function loadMore() {
  if (isFetching) return;
  isFetching = true;

  spinner.classList.add("visible");

  try {
    const photos = await fetchPhotos(currentPage);
    renderPhotos(photos);
    currentPage++;
  } catch (err) {
    console.error("Failed to load photos:", err);
    gallery.insertAdjacentHTML(
      "beforeend",
      `<p style="color:#f66;padding:1rem;grid-column:1/-1">
        Failed to load images. Check your API key in script.js.
      </p>`
    );
  } finally {
    spinner.classList.remove("visible");
    isFetching = false;
  }
}

// ── IntersectionObserver — watches the sentinel div ──────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  },
  {
    rootMargin: "200px", // Start loading 200px before the sentinel is visible
  }
);

observer.observe(sentinel);

// ── Initial load ──────────────────────────────────────────────────────────────
loadMore();
