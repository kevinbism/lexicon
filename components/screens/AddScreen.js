'use client';
import { useState, useEffect } from 'react';
import { useWordStore } from '../../store/useWordStore';

export default function AddScreen() {
  const { editingId, getEditingWord, saveWord, goHome } = useWordStore();

  const [inf, setInf] = useState('');
  const [past, setPast] = useState('');
  const [pp, setPp] = useState('');
  const [example, setExample] = useState('');
  const [trans, setTrans] = useState('');

  // Se stiamo modificando, precompila i campi
  useEffect(() => {
    const w = getEditingWord();
    if (w) {
      setInf(w.inf);
      setPast(w.past);
      setPp(w.pp);
      setExample(w.example ?? '');
      setTrans(w.trans ?? '');
    } else {
      setInf('');
      setPast('');
      setPp('');
      setExample('');
      setTrans('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId]);

  const isValid = inf.trim() && past.trim() && pp.trim();

  const handleSave = () => {
    if (!isValid) return;
    saveWord({
      inf: inf.trim(),
      past: past.trim(),
      pp: pp.trim(),
      example: example.trim(),
      trans: trans.trim(),
    });
  };

  const fieldClass = `
    w-full px-4 py-3.5 rounded-2xl
    border border-border bg-surface-low
    text-base text-text font-sans
    outline-none transition-all duration-200
    focus:border-primary focus:shadow-[0_0_0_3px_rgba(76,95,128,0.15)] focus:bg-surface
  `;
  const labelClass = 'block text-[10px] font-bold text-text2 uppercase tracking-[0.7px] mb-2';

  return (
    <>
      {/* Top bar */}
      <div
        className="
        sticky top-0 z-10 flex items-center gap-3 px-6 py-4.5
        bg-[rgba(249,249,249,0.85)] dark:bg-[rgba(14,17,18,0.85)]
        backdrop-blur-md
      "
      >
        <button
          type="button"
          onClick={goHome}
          className="
            w-10 h-10 rounded-full flex items-center justify-center shrink-0
            bg-surface-low border border-border text-lg text-text cursor-pointer
          "
        >
          ←
        </button>
        <h2 className="font-display text-[17px] font-bold text-text">
          {editingId ? 'Edit word' : 'New word'}
        </h2>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4.5 px-6 py-5">
        <div>
          <label
            className={labelClass}
            htmlFor="inf-input"
          >
            Infinitive *
          </label>
          <input
            id="inf-input"
            className={fieldClass}
            placeholder="e.g. to run"
            value={inf}
            onChange={e => setInf(e.target.value)}
          />
        </div>

        <div>
          <label
            className={labelClass}
            htmlFor="past-input"
          >
            Simple Past *
          </label>
          <input
            id="past-input"
            className={fieldClass}
            placeholder="e.g. ran"
            value={past}
            onChange={e => setPast(e.target.value)}
          />
        </div>

        <div>
          <label
            className={labelClass}
            htmlFor="pp-input"
          >
            Past Participle *
          </label>
          <input
            id="pp-input"
            className={fieldClass}
            placeholder="e.g. run"
            value={pp}
            onChange={e => setPp(e.target.value)}
          />
        </div>

        <div>
          <label
            className={labelClass}
            htmlFor="example-input"
          >
            Example sentence
          </label>
          <textarea
            id="example-input"
            className={`${fieldClass} resize-none min-h-21 leading-relaxed`}
            placeholder="e.g. She ran every morning."
            value={example}
            onChange={e => setExample(e.target.value)}
          />
        </div>

        <div>
          <label
            className={labelClass}
            htmlFor="trans-input"
          >
            Translation
          </label>
          <input
            id="trans-input"
            className={fieldClass}
            placeholder="e.g. correre"
            value={trans}
            onChange={e => setTrans(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={!isValid}
          className="
            w-full py-4 mt-1 rounded-2xl border-none cursor-pointer
            bg-primary text-on-primary
            font-display font-bold text-[15px] tracking-[0.1px]
            transition-all duration-150
            active:opacity-85 active:scale-[0.98]
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          {editingId ? 'Save changes' : 'Add word'}
        </button>
      </div>
    </>
  );
}
