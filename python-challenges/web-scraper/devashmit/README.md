# 🐍 Web Scraper with BeautifulSoup — Day 2 Python Challenge

**Issue:** [#216](https://github.com/abhishek-goswami1/Daily-Dev-Challenges/issues/216) | Week 1 | Intermediate

## 📋 Description

A web scraper that extracts all quotes, authors, and tags from [quotes.toscrape.com](http://quotes.toscrape.com) across all pages. Results are saved to both `.json` and `.csv` formats with automatic pagination handling.

## ✨ Features

- Scrapes all quotes, authors, and tags across all pages
- Automatic pagination — follows "Next" links until the last page
- Exports results to `quotes.json` and `quotes.csv`
- Polite scraping with `time.sleep(1)` between requests
- Clean error handling

## 🧠 Concepts Practiced

- `requests` + `BeautifulSoup4`
- HTML parsing and CSS selectors
- Pagination handling
- CSV and JSON file export

## 🚀 How to Run

```bash
pip install requests beautifulsoup4
python scraper.py
```

Output files `quotes.json` and `quotes.csv` will be created in the same directory.

## 🗂 Project Structure

```
devashmit/
├── scraper.py
├── quotes.json       # generated on run
├── quotes.csv        # generated on run
└── README.md
```
