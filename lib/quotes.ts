import fs from 'fs';
import path from 'path';

export interface Quote {
  text: string;
  author: string;
  category?: 'Anime' | 'Book';
}

export function getQuotes(): Quote[] {
  const quotesPath = path.join(process.cwd(), 'content', 'quotes.json');
  const fileContents = fs.readFileSync(quotesPath, 'utf8');
  const quotes: Quote[] = JSON.parse(fileContents);
  return quotes;
}

export function getQuotesByCategory(category: 'Anime' | 'Book'): Quote[] {
  const quotes = getQuotes();
  return quotes.filter((quote) => quote.category === category);
}
