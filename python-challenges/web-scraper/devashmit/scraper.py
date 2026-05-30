"""
Web Scraper with BeautifulSoup — quotes.toscrape.com
Day 2 — Python Challenge
Author: devashmit
"""

import csv
import json
import time

import requests
from bs4 import BeautifulSoup

BASE_URL = "http://quotes.toscrape.com"


def scrape_page(url: str) -> tuple[list[dict], str | None]:
    """
    Scrape a single page of quotes.
    Returns (list of quote dicts, next_page_url or None).
    """
    response = requests.get(url, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    quotes = []

    for quote_block in soup.select("div.quote"):
        text = quote_block.select_one("span.text").get_text(strip=True)
        author = quote_block.select_one("small.author").get_text(strip=True)
        tags = [tag.get_text(strip=True) for tag in quote_block.select("a.tag")]

        quotes.append({
            "text": text,
            "author": author,
            "tags": tags,
        })

    # Find the "Next" button link
    next_btn = soup.select_one("li.next > a")
    next_url = BASE_URL + next_btn["href"] if next_btn else None

    return quotes, next_url


def scrape_all_quotes() -> list[dict]:
    """Scrape all pages, following pagination automatically."""
    all_quotes = []
    current_url = BASE_URL
    page_num = 1

    while current_url:
        print(f"  Scraping page {page_num}: {current_url}")
        quotes, next_url = scrape_page(current_url)
        all_quotes.extend(quotes)
        print(f"    → {len(quotes)} quotes found (total: {len(all_quotes)})")

        current_url = next_url
        page_num += 1

        if current_url:
            time.sleep(1)  # Be polite — don't hammer the server

    return all_quotes


def save_json(quotes: list[dict], filename: str = "quotes.json") -> None:
    """Save quotes list to a JSON file."""
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(quotes, f, ensure_ascii=False, indent=2)
    print(f"  Saved {len(quotes)} quotes to {filename}")


def save_csv(quotes: list[dict], filename: str = "quotes.csv") -> None:
    """Save quotes list to a CSV file."""
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["text", "author", "tags"])
        writer.writeheader()
        for quote in quotes:
            writer.writerow({
                "text": quote["text"],
                "author": quote["author"],
                "tags": ", ".join(quote["tags"]),  # flatten tags list to string
            })
    print(f"  Saved {len(quotes)} quotes to {filename}")


def main() -> None:
    print("\n🐍 Web Scraper — quotes.toscrape.com")
    print("   Scraping all pages...\n")

    quotes = scrape_all_quotes()

    print(f"\n✅ Scraping complete — {len(quotes)} total quotes\n")
    print("Saving results...")

    save_json(quotes)
    save_csv(quotes)

    print("\nDone.")


if __name__ == "__main__":
    main()
