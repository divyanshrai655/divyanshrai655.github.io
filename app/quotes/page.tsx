import { getQuotes } from '@/lib/quotes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quotes',
    description: 'Inspiration which I draw from animes and books',
};

const categoryColors: Record<string, string> = {
    Anime: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Philosophy: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Wisdom: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};

export default function QuotesPage() {
    const quotes = getQuotes();

    return (
        <div className="space-y-8 font-geist-mono">
            <header className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">Words that hit hard</h1>
                <p className="subheader leading-relaxed">
                    A collection of quotes that stayed with me (and some still sinking in).
                </p>
            </header>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mt-8">
                {quotes.map((quote, index) => (
                    <div
                        key={index}
                        className="group relative mb-6 break-inside-avoid p-6 rounded-lg border border-border bg-background hover:border-accent transition-all duration-300 hover:shadow-lg"
                    >
                        {/* Quote text, with category badge floated inside it so text wraps around any label length */}
                        <blockquote className="text-foreground leading-relaxed mb-4 whitespace-pre-line">
                            {quote.category && (
                                <span
                                    className={`float-right ml-3 mb-1 whitespace-nowrap text-xs px-2 py-1 rounded-full ${
                                        categoryColors[quote.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                    }`}
                                >
                                    {quote.category}
                                </span>
                            )}
                            {quote.text}
                        </blockquote>

                        {/* Author */}
                        <div className="pt-4 border-t border-border">
                            <p className="text-sm text-muted font-medium">{quote.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
