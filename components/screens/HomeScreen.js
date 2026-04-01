'use client';
import { useWordStore } from '../../store/useWordStore';
import WordCard from '../ui/WordCard';
import StatChip from '../ui/StatChip';

export default function HomeScreen() {
  const { getFilteredWords, getStats, searchQuery, setSearchQuery } = useWordStore();

  const words = getFilteredWords();
  const { total, learned, favs } = getStats();

  return (
    <>
      {/* Top bar */}
      <div
        className="
        sticky top-0 z-10 px-6 pt-5 pb-4
        bg-[rgba(249,249,249,0.85)] dark:bg-[rgba(14,17,18,0.85)]
        backdrop-blur-md
      "
      >
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-extrabold tracking-[-0.4px] text-text">
            Lexicon
          </h1>
        </div>
        <p className="text-[13px] text-text2 mt-0.5">
          {total === 0 ? 'No words yet' : `${total} word${total !== 1 ? 's' : ''} saved`}
        </p>

        {/* Search */}
        <div className="relative mt-3.5">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text3 text-lg pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search verbs…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="
              w-full h-13 pl-11.5 pr-4
              rounded-2xl border-none
              bg-surface-low text-text text-[15px] font-medium
              font-sans outline-none
              placeholder:text-text4
              transition-all duration-200
              focus:bg-surface-highest focus:shadow-[0_0_0_2px_var(--color-primary)]
            "
          />
        </div>
      </div>

      {/* Stats */}
      {total > 0 && (
        <div className="flex gap-2.5 px-6 pt-4">
          <StatChip
            num={total}
            label="Total"
          />
          <StatChip
            num={learned}
            label="Learned"
          />
          <StatChip
            num={favs}
            label="Favorites"
          />
        </div>
      )}

      {/* Word list */}
      <div className="flex flex-col gap-3 px-6 py-4">
        {words.length === 0 ? (
          <div className="text-center py-16 px-8">
            <div className="text-[52px] mb-3.5">📖</div>
            <p className="text-[15px] leading-relaxed text-text2">
              {searchQuery ? 'No verbs match your search.' : 'Tap + to add your first verb.'}
            </p>
          </div>
        ) : (
          words.map(w => (
            <WordCard
              key={w.id}
              word={w}
            />
          ))
        )}
      </div>
    </>
  );
}
