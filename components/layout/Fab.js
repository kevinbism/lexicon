import { useWordStore } from '../../store/useWordStore';

export default function Fab() {
  const { currentScreen, openAdd } = useWordStore();

  if (currentScreen !== 'home') return null;

  return (
    <button
      type="button"
      onClick={openAdd}
      className="
        fixed bottom-[calc(var(--nav-h)+20px)] right-6
        w-15 h-15 rounded-full
        bg-primary text-on-primary
        text-[30px] border-none cursor-pointer
        flex items-center justify-center
        shadow-[0_4px_20px_rgba(76,95,128,0.35)]
        z-20 transition-all duration-100
        active:scale-[0.91] active:shadow-[0_2px_8px_rgba(76,95,128,0.2)]
      "
      aria-label="Add word"
    >
      +
    </button>
  );
}
