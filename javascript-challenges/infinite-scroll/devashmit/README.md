# 🟨 Infinite Scroll Gallery — Day 2 JavaScript Challenge

**Issue:** [#220](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/220) | Week 1 | Intermediate

## 📋 Description

An infinite scroll image gallery using the Unsplash API. Loads 12 images initially, then automatically fetches the next page when the user scrolls to the bottom using `IntersectionObserver`. Includes a loading spinner.

## ✨ Features

- Loads 12 images on initial page load
- `IntersectionObserver` detects scroll end (more performant than scroll events)
- Automatically fetches next page of images
- Loading spinner shown during fetch
- Masonry-style responsive grid layout
- API key stored in a config object

## 🧠 Concepts Practiced

- `Fetch API` with async/await
- `IntersectionObserver` API
- Pagination state management
- Loading states and UX feedback

## 🚀 How to Run

1. Get a free API key from [unsplash.com/developers](https://unsplash.com/developers)
2. Open `script.js` and replace `YOUR_UNSPLASH_ACCESS_KEY` with your key
3. Open `index.html` in any browser

## 🗂 Project Structure

```
devashmit/
├── index.html
├── styles.css
├── script.js
└── README.md
```
