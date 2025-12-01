import React from 'react';
import { Medication } from '../types';
import { Check, Info, MoreHorizontal } from 'lucide-react';

interface HomeTabProps {
  meds: Medication[];
  onTakeMed: (id: string) => void;
  streak: number;
}

export const HomeTab: React.FC<HomeTabProps> = ({ meds, onTakeMed, streak }) => {
  const adherenceScore = 92; 
  const upcomingMeds = meds.filter(m => !m.takenToday).sort((a, b) => a.time.localeCompare(b.time));
  
  // Combine all for display if no upcoming, or just show upcoming
  const displayMeds = upcomingMeds.length > 0 ? upcomingMeds : meds.filter(m => m.takenToday);
  const isAllDone = upcomingMeds.length === 0;

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-4 pb-24 overflow-y-auto no-scrollbar bg-bg">
      {/* Header */}
      <div className="flex justify-between items-center px-6 mb-2">
        <h1 className="text-3xl font-extrabold text-text tracking-tight">Pilly</h1>
        <button className="bg-gray-100/50 hover:bg-gray-200/50 transition-colors px-3 py-1.5 rounded-full text-sm font-bold text-inactive flex items-center gap-1">
          Help <span className="bg-gray-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">?</span>
        </button>
      </div>

      {/* Mascot Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-60 h-60 mb-2 relative">
            <img 
                src="https://i.ibb.co/PSmnvpM/Chat-GPT-Image-Dec-1-2025-03-52-47-PM.png" 
                alt="Mascot"
                className="w-full h-full object-contain"
            />
        </div>
        
        {/* Adherence Score */}
        <div className="text-center w-full px-8">
            <div className="text-6xl font-black text-text mb-3 tracking-tighter">{adherenceScore}</div>
            
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full mb-3 overflow-hidden">
                <div 
                    className="h-full bg-success rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${adherenceScore}%` }}
                />
            </div>
            
            <div className="flex justify-center items-center gap-1 text-inactive text-sm font-medium">
                Health <Info size={14} />
            </div>
        </div>
      </div>

      <div className="h-px bg-separator w-full opacity-50 mb-4"></div>

      {/* Stats Row */}
      <div className="flex justify-between px-8 mb-6">
        <div className="text-center flex-1">
            <p className="text-inactive text-sm font-bold mb-1">Adherence Streak</p>
            <p className="text-3xl font-extrabold text-text">{streak} days</p>
        </div>
        <div className="text-center flex-1">
            <p className="text-inactive text-sm font-bold mb-1">Meds Taken</p>
            <p className="text-3xl font-extrabold text-text">{meds.filter(m => m.takenToday).length}</p>
        </div>
      </div>
      
      <div className="h-px bg-separator w-full opacity-50 mb-6"></div>

      {/* Upcoming Meds Section */}
      <div className="px-6">
        <h2 className="text-lg font-bold text-text mb-2">
            {isAllDone ? "Completed Today" : "Upcoming Meds"}
        </h2>
        
        <div className="flex flex-col">
            {displayMeds.map((med, index) => (
                <div key={med.id} className="group py-4 flex items-center justify-between border-b border-separator/60 last:border-0">
                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
                            style={{ backgroundColor: med.color }}
                        >
                           <span className="font-bold text-xs">{med.name[0]}</span>
                        </div>

                        {/* Text */}
                        <div className="flex flex-col">
                            <span className="font-bold text-text text-base">{med.name}</span>
                            <span className="text-inactive text-sm font-medium">{med.dosage}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                         <span className="text-inactive text-sm font-bold">{med.time}</span>
                         {!med.takenToday && (
                             <button 
                                onClick={() => onTakeMed(med.id)}
                                className="w-8 h-8 rounded-full border-2 border-separator hover:border-success hover:bg-success hover:text-white text-transparent transition-all flex items-center justify-center"
                             >
                                 <Check size={16} strokeWidth={4} />
                             </button>
                         )}
                         {med.takenToday && (
                             <div className="w-8 h-8 flex items-center justify-center text-success">
                                 <Check size={20} strokeWidth={3} />
                             </div>
                         )}
                    </div>
                </div>
            ))}
            
            {displayMeds.length === 0 && (
                 <div className="py-8 text-center text-inactive text-sm">
                    No medications scheduled.
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};