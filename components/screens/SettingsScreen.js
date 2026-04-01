'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useWordStore } from '../../store/useWordStore';
import ResetModal from '../ui/ResetModal';

export default function SettingsScreen() {
  const { getStats, clearLearned, addSamples, resetAllWords } = useWordStore();
  const { total, learned, favs } = getStats();

  const [showResetModal, setShowResetModal] = useState(false);

  const handleAddSamples = () => {
    addSamples();
    toast.success('Sample words added!');
  };

  const handleClearLearned = () => {
    clearLearned();
    toast.success('Learned status reset!');
  };

  const handleResetConfirm = () => {
    resetAllWords();
    setShowResetModal(false);
    toast.success('All words deleted.');
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
        {/* Stats */}
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

        {/* Actions */}
        <div className="text-[10px] font-bold text-text3 uppercase tracking-[0.6px] mt-4 mb-1.5 mx-1">
          Actions
        </div>
        <div className="bg-surface border border-border rounded-[2rem] overflow-hidden">
          <div
            onClick={handleAddSamples}
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

        {/* Danger zone */}
        <div className="text-[10px] font-bold text-text3 uppercase tracking-[0.6px] mt-4 mb-1.5 mx-1">
          Danger zone
        </div>
        <div className="bg-surface border border-border rounded-[2rem] overflow-hidden">
          <div
            onClick={() => setShowResetModal(true)}
            className="
              flex items-center justify-between px-4.5 py-3.75
              cursor-pointer hover:bg-surface-low transition-colors
            "
          >
            <span className="text-[15px] text-error font-semibold">Delete all words</span>
            <span className="text-[15px] font-semibold text-error">Delete</span>
          </div>
        </div>
      </div>

      <ResetModal
        show={showResetModal}
        onCancel={() => setShowResetModal(false)}
        onConfirm={handleResetConfirm}
      />
    </>
  );
}
