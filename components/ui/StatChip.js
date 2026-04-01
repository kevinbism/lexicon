export default function StatChip({ num, label }) {
  return (
    <div className="flex-1 bg-surface border border-border rounded-2xl p-3 text-center">
      <div className="font-display text-2xl font-bold text-primary">{num}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-text3 mt-0.5">
        {label}
      </div>
    </div>
  );
}
