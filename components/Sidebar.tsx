
import React from 'react';
import type { ViewType } from '../types';
import { HomeIcon, StreamIcon, SettingsIcon } from './icons/Icons';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const SidebarButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`
      w-12 h-12 rounded-full flex items-center justify-center
      transition-all duration-200 ease-in-out transform
      ${isActive
        ? 'bg-indigo-600 text-white scale-110'
        : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white hover:rounded-2xl'
      }
    `}
  >
    {icon}
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="w-20 bg-slate-900 p-3 flex flex-col items-center space-y-4 border-r border-slate-700/50">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
        C
      </div>
      <div className="w-8 border-t border-slate-700 my-2"></div>
      <SidebarButton
        label="Chat"
        icon={<HomeIcon />}
        isActive={activeView === 'chat'}
        onClick={() => setActiveView('chat')}
      />
      <SidebarButton
        label="Live Stream"
        icon={<StreamIcon />}
        isActive={activeView === 'livestream'}
        onClick={() => setActiveView('livestream')}
      />
      <div className="flex-grow"></div>
      <SidebarButton
        label="Settings"
        icon={<SettingsIcon />}
        isActive={activeView === 'settings'}
        onClick={() => setActiveView('settings')}
      />
    </nav>
  );
};
