'use client';
import { useState } from 'react';
import { useWordStore } from '../../store/useWordStore';
import DeleteModal from '../ui/DeleteModal';

export default function DetailScreen() {
  const { getCurrentWord, goHome, openEdit, toggleFav, toggleLearned } = useWordStore();
  const [showDelete, setShowDelete] = useState(false);

  const word = getCurrentWord();
  if (!word) return null;

  return (
    <>
      {/* Top bar */}
      <div
        className="
        sticky top-0 z-10 flex items-center justify-between px-6 py-4.5
        bg-[rgba(249,249,249,0.85)] dark:bg-[rgba(14,17,18,0.85)]
        backdrop-blur-md
      "
      >
        <div className="flex items-center gap-3">
          <button
            onClick={goHome}
            className="
              w-10 h-10 rounded-full flex items-center justify-center
              bg-surface-low border border-border text-lg text-text3 cursor-pointer
            "
          >
            ←
          </button>
        </div>

        {/* Bottone stella */}
        <button
          onClick={() => toggleFav(word.id)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            bg-surface-low border border-border text-xl cursor-pointer
            transition-colors duration-150
            ${word.fav ? 'text-[#f5a623]' : 'text-text3'}
          `}
        >
          {word.fav ? '★' : '☆'}
        </button>
      </div>

      {/* Hero */}
      <div className="px-6 pt-6 pb-5 bg-surface border-b border-border">
        <span
          className="
          inline-block px-2.5 py-0.5 rounded-full mb-2.5
          bg-secondary-container text-on-secondary-container
          text-[10px] font-bold uppercase tracking-[0.6px]
        "
        >
          Infinitive
        </span>
        <div className="font-display text-[34px] font-extrabold tracking-[-0.6px] text-text">
          {word.inf}
        </div>

        {/* Chips past / pp */}
        <div className="grid grid-cols-2 gap-2.5 mt-4.5">
          {[
            ['Simple Past', word.past],
            ['Past Participle', word.pp],
          ].map(([lbl, val]) => (
            <div
              key={lbl}
              className="bg-surface-low rounded-2xl px-3.5 py-3"
            >
              <div className="text-[10px] text-text3 font-bold uppercase tracking-[0.5px]">
                {lbl}
              </div>
              <div className="font-display text-[15px] font-semibold text-text mt-0.5">{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Esempio */}
      {word.example && (
        <div className="px-6 py-4.5 border-b border-border">
          <div className="text-[10px] font-bold text-text3 uppercase tracking-[0.6px] mb-2">
            Example
          </div>
          <p className="text-base text-text leading-[1.65] italic">{word.example}</p>
        </div>
      )}

      {/* Traduzione */}
      {word.trans && (
        <div className="px-6 py-4.5 border-b border-border">
          <div className="text-[10px] font-bold text-text3 uppercase tracking-[0.6px] mb-2">
            Translation
          </div>
          <p className="text-[15px] text-text2 leading-normal">{word.trans}</p>
        </div>
      )}

      {/* Bottone learned */}
      <button
        onClick={() => toggleLearned(word.id)}
        className={`
          block mx-6 mt-4.5 w-[calc(100%-48px)] py-3.5 rounded-2xl border-none cursor-pointer
          font-display font-bold text-[15px] transition-opacity duration-150
          ${
            word.learned
              ? 'bg-tertiary text-white'
              : 'bg-tertiary-container text-on-tertiary-container'
          }
        `}
      >
        {word.learned ? '✓ Learned' : 'Mark as learned'}
      </button>

      {/* Azioni edit / delete */}
      <div className="flex gap-2.5 px-6 pt-3 pb-1">
        <button
          onClick={() => openEdit(word.id)}
          className="
            flex-1 py-3.5 rounded-2xl border-none cursor-pointer
            bg-primary-container text-on-primary-container
            font-display font-bold text-[15px]
            transition-opacity active:opacity-75
          "
        >
          Edit
        </button>
        <button
          onClick={() => setShowDelete(true)}
          className="
            flex-1 py-3.5 rounded-2xl border-none cursor-pointer
            bg-error-container text-error
            font-display font-bold text-[15px]
            transition-opacity active:opacity-75
          "
        >
          Delete
        </button>
      </div>

      <DeleteModal
        show={showDelete}
        onCancel={() => setShowDelete(false)}
      />
    </>
  );
}
