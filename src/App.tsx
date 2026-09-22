import { useEffect, useState } from "react";
import { getEmojis, type IEmojiItem } from "./api/emojiApi";

export default function App() {
  const [emojis, setEmojis] = useState<IEmojiItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEmojis(query);
        if (!cancelled) setEmojis(data);
      } catch {
        if (!cancelled) setError("Не удалось загрузить данные. Проверьте, запущен ли сервер.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
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
            placeholder="Введите название или ключевое слово..."
            aria-label="Search emoji by keywords"
          />
        </div>

        <section className="grid">
          {loading ? (
            <p className="empty">Загрузка эмодзи...</p>
          ) : error ? (
            <p className="empty">{error}</p>
          ) : emojis.length === 0 ? (
            <p className="empty">Эмодзи не найдены</p>
          ) : (
            emojis.map((e) => (
              <article className="card" key={`${e.emoji}-${e.title}`}>
                <span className="card__symbol">{e.emoji}</span>
                <h2 className="card__title">{e.title}</h2>
                <p className="card__keywords">{e.keywords}</p>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
