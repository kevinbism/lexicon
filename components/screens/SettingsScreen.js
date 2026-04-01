'use client';
import { useWordStore } from '../../store/useWordStore';

export default function SettingsScreen() {
  const { getStats, clearLearned, addSamples } = useWordStore();
  const { total, learned, favs } = getStats();

  const handleClearLearned = () => {
    if (!confirm('Reset learned status for all words?')) return;
    clearLearned();
  };

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
          Settings
        </h1>
      </div>

      <div className="flex flex-col gap-2 px-6 py-5">
        {/* Sezione Stats */}
        <div className="text-[10px] font-bold text-text3 uppercase tracking-[0.6px] mt-4 mb-1.5 mx-1">
          Your progress
        </div>
        <div className="bg-surface border border-border rounded-[2rem] overflow-hidden">
          {[
            ['Total words', total],
            ['Learned', learned],
            ['Favorites', favs],
          ].map(([label, val], i, arr) => (
            <div
              key={label}
              className={`
                flex items-center justify-between px-4.5 py-3.75
                ${i < arr.length - 1 ? 'border-b border-border' : ''}
              `}
            >
              <span className="text-[15px] text-text">{label}</span>
              <span className="text-[15px] text-text2">{val}</span>
            </div>
          ))}
        </div>

        {/* Sezione Actions */}
        <div className="text-[10px] font-bold text-text3 uppercase tracking-[0.6px] mt-4 mb-1.5 mx-1">
          Actions
        </div>
        <div className="bg-surface border border-border rounded-[2rem] overflow-hidden">
          <div
            onClick={addSamples}
            className="
              flex items-center justify-between px-4.5 py-3.75
              border-b border-border cursor-pointer
              hover:bg-surface-low transition-colors
            "
          >
            <span className="text-[15px] text-text">Load sample words</span>
            <span className="text-[15px] font-semibold text-primary">Add</span>
          </div>
          <div
            onClick={handleClearLearned}
            className="
              flex items-center justify-between px-4.5 py-3.75
              cursor-pointer hover:bg-surface-low transition-colors
            "
          >
            <span className="text-[15px] text-text">Reset learned status</span>
            <span className="text-[15px] font-semibold text-primary">Reset</span>
          </div>
        </div>
      </div>
    </>
  );
}
