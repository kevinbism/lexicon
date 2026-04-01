import { useWordStore } from '../../store/useWordStore';

export default function WordCard({ word, showFavToggle = true }) {
  const { openDetail, toggleFav } = useWordStore();

  const handleFav = e => {
    e.stopPropagation();
    toggleFav(word.id);
  };

  return (
    <div
      onClick={() => openDetail(word.id)}
      onKeyUp={e => {
        if (e.key === 'Enter' || e.key === ' ') openDetail(word.id);
      }}
      className="
        relative bg-surface rounded-[2rem] px-5 pt-5 pb-4.5 cursor-pointer
        transition-all duration-150
        hover:bg-surface-mid hover:shadow-md
        active:scale-[0.985]
      "
    >
      {/* Bottone preferito */}
      {showFavToggle && (
        <button
          type="button"
          onClick={handleFav}
          className={`
            absolute top-4.5 right-4.5 bg-transparent border-none
            text-[22px] leading-none p-1 cursor-pointer transition-colors duration-150
            ${word.fav ? 'text-[#f5a623]' : 'text-text4'}
          `}
        >
          {word.fav ? '★' : '☆'}
        </button>
      )}

      {/* Badge "Infinitive" */}
      <span
        className="
        inline-block px-2.5 py-0.5 rounded-full
        bg-secondary-container text-on-secondary-container
        text-[10px] font-bold uppercase tracking-[0.6px] mb-2.5
      "
      >
        Infinitive
      </span>

      {/* Parola principale */}
      <div className="font-display text-[22px] font-bold text-text">{word.inf}</div>

      {/* Forme */}
      <div className="text-[13px] text-text2 mt-0.5 italic">
        past: {word.past} &nbsp;·&nbsp; pp: {word.pp}
      </div>

      {/* Pills learned / fav */}
      {(word.learned || word.fav) && (
        <div className="flex gap-1.5 mt-2.5 flex-wrap">
          {word.learned && (
            <span
              className="
              text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-[0.4px]
              bg-tertiary-container text-on-tertiary-container
            "
            >
              Learned
            </span>
          )}
          {word.fav && (
            <span
              className="
              text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-[0.4px]
              bg-primary-container text-on-primary-container
            "
            >
              Favorite
            </span>
          )}
        </div>
      )}
    </div>
  );
}
