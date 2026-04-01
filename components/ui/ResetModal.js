export default function ResetModal({ show, onCancel, onConfirm }) {
  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onCancel}
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        className="
        fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-107.5
        bg-surface rounded-t-[2rem] p-6 z-50
        shadow-[0_-8px_40px_rgba(0,0,0,0.15)]
      "
      >
        <h3 className="font-display text-lg font-bold text-text mb-1">Reset all words?</h3>
        <p className="text-sm text-text2 mb-6">
          All your saved verbs will be permanently deleted. This cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
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
            onClick={onConfirm}
            className="
              flex-1 py-4 rounded-2xl border-none cursor-pointer
              bg-error-container text-error-dark font-display font-bold text-[15px]
              transition-opacity active:opacity-75
            "
          >
            Reset all
          </button>
        </div>
      </div>
    </>
  );
}
