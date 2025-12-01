import React from 'react';
import { Bell, Shield, Moon, Volume2, LogOut, ChevronRight, User } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const SettingItem = ({ icon: Icon, label, value, type = 'toggle', isDestructive = false }: any) => (
    <div className="flex items-center justify-between py-4 px-6 border-b border-separator/60 hover:bg-black/[0.02] transition-colors cursor-pointer bg-transparent">
        <div className="flex items-center gap-3">
            <Icon size={20} className={isDestructive ? "text-danger" : "text-text"} />
            <span className={`font-bold text-base ${isDestructive ? "text-danger" : "text-text"}`}>{label}</span>
        </div>
        
        {type === 'toggle' && (
            <div className={`w-11 h-6 rounded-full p-1 transition-colors ${value ? 'bg-success' : 'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
        )}
        
        {type === 'link' && (
             <ChevronRight size={20} className="text-gray-300" />
        )}
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-4 pb-24 overflow-y-auto no-scrollbar bg-bg">
      <h1 className="text-3xl font-extrabold text-text mb-8 px-6 tracking-tight">Settings</h1>

      <div className="px-6 mb-8">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-separator shadow-sm">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 overflow-hidden">
                <User size={28} />
            </div>
            <div>
                <h2 className="font-bold text-lg text-text">Guest User</h2>
                <p className="text-xs text-inactive font-medium">guest@brainhealth.app</p>
            </div>
            <div className="ml-auto">
                <button className="text-primary text-sm font-bold">Edit</button>
            </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-bold text-inactive uppercase tracking-wider mb-2 px-6">Preferences</h3>
        <div className="border-t border-separator/60">
            <SettingItem icon={Bell} label="Push Notifications" value={true} />
            <SettingItem icon={Volume2} label="Sound Effects" value={true} />
            <SettingItem icon={Moon} label="Dark Mode" value={false} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-inactive uppercase tracking-wider mb-2 px-6">Support</h3>
        <div className="border-t border-separator/60">
            <SettingItem icon={Shield} label="Privacy & Security" type="link" />
            <SettingItem icon={LogOut} label="Log Out" type="button" isDestructive={true} />
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-300 mt-auto font-medium">v1.0.2</p>
    </div>
  );
};