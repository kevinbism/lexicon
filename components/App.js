'use client';
import { Toaster } from 'react-hot-toast';
import { useWordStore } from '../store/useWordStore';

import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import DetailScreen from './screens/DetailScreen';
import FavsScreen from './screens/FavsScreen';
import SettingsScreen from './screens/SettingsScreen';

import BottomNav from './layout/BottomNav';
import Fab from './layout/Fab';

const SCREENS = {
  home: <HomeScreen />,
  add: <AddScreen />,
  detail: <DetailScreen />,
  favs: <FavsScreen />,
  settings: <SettingsScreen />,
};

export default function App() {
  const { currentScreen } = useWordStore();

  return (
    <div className="w-full max-w-107.5 mx-auto h-dvh flex flex-col bg-bg overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: '500',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            borderRadius: '1rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            maxWidth: '360px',
          },
        }}
      />
      <main className="flex-1 overflow-y-auto pb-4">{SCREENS[currentScreen]}</main>
      <Fab />
      <BottomNav />
    </div>
  );
}
