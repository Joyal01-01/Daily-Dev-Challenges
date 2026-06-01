# ⚛️ GitHub Profile Finder — Day 3 React Challenge

**Issue:** [#227](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/227) | Week 1 | Intermediate

## 📋 Description

A React app that fetches a GitHub user's public profile from the GitHub REST API. Shows avatar, bio, repo count, followers, and top 5 repos. Includes loading skeletons and error handling for invalid usernames.

## ✨ Features

- Search any GitHub username
- Displays: avatar, name, bio, location, followers, following, public repos
- Top 5 repos with stars and language
- Loading skeleton UI while fetching
- Error handling for invalid/not-found usernames
- Custom `useFetch` hook for reusable fetch logic
- Responsive layout

## 🧠 Concepts Practiced

`Fetch API` · `Custom hooks` · `useEffect async/await` · `Loading states` · `Error handling`

## 🚀 How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🗂 Project Structure

```
devashmit/
├── src/
│   ├── hooks/
│   │   └── useFetch.js
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── RepoList.jsx
│   │   └── Skeleton.jsx
│   ├── App.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```
