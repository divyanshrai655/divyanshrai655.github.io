import { getQuotes } from '@/lib/quotes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quotes',
    description: 'Inspiration which I draw from animes and books',
};

export default function QuotesPage() {
    const quotes = getQuotes();

    return (
        <div className="space-y-8 font-geist-mono">
            <header className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">Words that hit hard</h1>
                <p className="text-muted leading-relaxed">
                    A collection of quotes that stayed with me.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {quotes.map((quote, index) => (
                    <div
                        key={index}
                        className="group relative p-6 rounded-lg border border-border bg-background hover:border-accent transition-all duration-300 hover:shadow-lg"
                    >
                        {/* Category badge */}
                        <div className="absolute top-4 right-4">
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${quote.category === 'Anime'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                    }`}
                            >
                                {quote.category}
                            </span>
                        </div>

                        {/* Quote text */}
                        <div className="pr-16">
                            <blockquote className="text-foreground leading-relaxed mb-4">
                                &ldquo;{quote.text}&rdquo;
                            </blockquote>
                        </div>

                        {/* Author */}
                        <div className="mt-auto pt-4 border-t border-border">
                            <p className="text-sm text-muted font-medium">— {quote.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
