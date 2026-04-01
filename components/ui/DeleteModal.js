import { useWordStore } from '../../store/useWordStore';

export default function DeleteModal({ show, onCancel }) {
  const { currentId, deleteWord } = useWordStore();

  if (!show) return null;

  const handleDelete = () => {
    deleteWord(currentId);
  };

  return (
    <>
      {/* Overlay scuro */}
      <div
        onClick={onCancel}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            onCancel();
          }
        }}
        tabIndex={0}
        role="button"
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
      />

      {/* Card modale */}
      <div
        className="
        fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-107.5
        bg-surface rounded-t-[2rem] p-6 z-50
        shadow-[0_-8px_40px_rgba(0,0,0,0.15)]
      "
      >
        <h3 className="font-display text-lg font-bold text-text mb-1">Delete this word?</h3>
        <p className="text-sm text-text2 mb-6">This action cannot be undone.</p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1 py-4 rounded-2xl border border-border
              bg-surface-low text-text font-display font-bold text-[15px]
              transition-opacity active:opacity-75
            "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="
              flex-1 py-4 rounded-2xl
              bg-error-container text-error-dark font-display font-bold text-[15px]
              transition-opacity active:opacity-75
            "
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
