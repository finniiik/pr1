import { useMemo, useState } from "react";
import { emojis } from "./data/emojis";

export default function App() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return emojis;
    return emojis.filter(
      (e) => e.title.toLowerCase().includes(q) || e.keywords.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main className="page">
      <div className="panel">
        <header className="hero">
          <h1 className="hero__title">Emoji Finder</h1>
          <p className="hero__subtitle">Find emoji by keywords</p>
        </header>

        <div className="search">
          <input
            className="search__input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Placeholder"
            aria-label="Search emoji by keywords"
          />
        </div>

        <section className="grid">
          {results.map((e) => (
            <article className="card" key={e.title + e.symbol}>
              <span className="card__symbol">{e.symbol}</span>
              <h2 className="card__title">{e.title}</h2>
              <p className="card__keywords">{e.keywords}</p>
            </article>
          ))}
          {results.length === 0 && <p className="empty">Nothing found for “{query}”</p>}
        </section>
      </div>
    </main>
  );
}
