import { useWordStore } from '../../store/useWordStore';

const NAV_ITEMS = [
  { screen: 'home', icon: '📖', label: 'Home' },
  { screen: 'favs', icon: '★', label: 'Favorites' },
  { screen: 'settings', icon: '⚙︎', label: 'Settings' },
];

export default function BottomNav() {
  const { currentScreen, goTo } = useWordStore();

  // La bottom nav non è visibile nel detail screen
  if (currentScreen === 'detail') return null;

  return (
    <nav
      className="
      h-(--nav-h) sticky bottom-0 z-30
      bg-[rgba(249,249,249,0.85)] dark:bg-[rgba(14,17,18,0.85)]
      backdrop-blur-md
      rounded-t-3xl
      shadow-[0_-8px_24px_rgba(0,0,0,0.06)]
      flex items-center justify-around
      px-2 pb-4 pt-2
    "
    >
      {NAV_ITEMS.map(({ screen, icon, label }) => {
        const isActive = currentScreen === screen || (currentScreen === 'add' && screen === 'home');

        return (
          <button
            type="button"
            key={screen}
            onClick={() => goTo(screen)}
            className={`
              flex-1 flex flex-col items-center justify-center gap-1
              border-none cursor-pointer
              text-[10px] font-semibold uppercase tracking-[0.5px]
              px-1.5 py-2 rounded-2xl
              transition-all duration-150
              ${
                isActive
                  ? 'bg-[rgba(209,230,220,0.4)] text-[#2d5a40] dark:bg-[rgba(50,80,65,0.35)] dark:text-[#a0c9b2]'
                  : 'bg-transparent text-text3'
              }
            `}
          >
            <span className="text-[22px] leading-none">{icon}</span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}
