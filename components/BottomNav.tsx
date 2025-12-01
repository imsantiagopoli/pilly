import React from 'react';
import { Tab } from '../types';
import { Home, Calendar, Pill, Settings } from 'lucide-react';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { tab: Tab.HOME, icon: Home, label: 'Home' },
    { tab: Tab.HISTORY, icon: Calendar, label: 'History' },
    { tab: Tab.MY_MEDS, icon: Pill, label: 'My Meds' },
    { tab: Tab.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg shadow-[0_-4px_10px_rgba(0,0,0,0.03)] pb-safe pt-2 px-6 h-[88px] flex justify-between items-start z-40 max-w-md mx-auto">
      {navItems.map((item) => {
        const isActive = currentTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className="flex flex-col items-center justify-center pt-3 w-16 group"
          >
            <item.icon 
                size={28} 
                className={`mb-1 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-inactive'}`} 
                strokeWidth={isActive ? 2.5 : 2}
            />
            <span 
                className={`text-[10px] font-bold transition-all duration-200 ${isActive ? 'text-primary' : 'text-inactive'}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};