'use client';
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
      <main className="flex-1 overflow-y-auto pb-4">{SCREENS[currentScreen]}</main>
      <Fab />
      <BottomNav />
    </div>
  );
}
