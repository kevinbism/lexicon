'use client';
import { useWordStore } from '../../store/useWordStore';
import WordCard from '../ui/WordCard';

export default function FavsScreen() {
  const { getFavWords } = useWordStore();
  const favs = getFavWords();

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
        <h1 className="font-display text-xl font-extrabold tracking-[-0.4px] text-text">
          Favorites
        </h1>
        <p className="text-[13px] text-text2 mt-0.5">
          {favs.length === 0
            ? 'No favorites yet'
            : `${favs.length} word${favs.length !== 1 ? 's' : ''} starred`}
        </p>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-3 px-6 py-4">
        {favs.length === 0 ? (
          <div className="text-center py-16 px-8">
            <div className="text-[52px] mb-3.5">★</div>
            <p className="text-[15px] leading-relaxed text-text2">
              No favorites yet.
              <br />
              Star a verb to add it here.
            </p>
          </div>
        ) : (
          favs.map(w => (
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
