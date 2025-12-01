import React, { useState } from 'react';
import { HistoryLog, Medication } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HistoryTabProps {
  logs: HistoryLog[];
  meds: Medication[];
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ logs, meds }) => {
  const [selectedMedId, setSelectedMedId] = useState<string>('all');

  // Mock data
  const data = [
    { day: 'M', score: 80 },
    { day: 'T', score: 95 },
    { day: 'W', score: 100 },
    { day: 'T', score: 60 },
    { day: 'F', score: 100 },
    { day: 'S', score: 90 },
    { day: 'S', score: 92 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken': return '#4cd964';
      case 'missed': return '#ff3b30';
      case 'late': return '#ffcc00';
      default: return 'transparent';
    }
  };

  const renderCalendar = () => {
    // Generate dummy calendar data
    const days = Array.from({ length: 30 }, (_, i) => {
      // Random status for demo
      const r = Math.random();
      const status = r > 0.8 ? 'missed' : (r > 0.9 ? 'late' : 'taken');
      return { day: i + 1, status };
    });

    return (
      <div className="w-full">
        <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-center text-[10px] font-bold text-inactive opacity-60 uppercase">{d}</div>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
            {days.map((d) => (
            <div key={d.day} className="aspect-square flex flex-col items-center justify-center relative">
                <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                    ${d.status === 'taken' ? 'bg-success/10 text-success' : 
                      d.status === 'missed' ? 'bg-danger/10 text-danger' :
                      'bg-warning/10 text-warning'}`}
                >
                    {d.day}
                </div>
                {/* Dot indicator */}
                <div className={`w-1 h-1 rounded-full mt-1 ${
                     d.status === 'taken' ? 'bg-success' : 
                     d.status === 'missed' ? 'bg-danger' :
                     'bg-warning'
                }`}></div>
            </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-4 pb-24 overflow-y-auto no-scrollbar bg-bg">
      <div className="px-6 mb-6">
        <h1 className="text-3xl font-extrabold text-text tracking-tight mb-6">History</h1>

        {/* Filter Chips - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
            <button
            onClick={() => setSelectedMedId('all')}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                selectedMedId === 'all' 
                ? 'bg-text text-white border-text' 
                : 'bg-transparent text-text border-gray-300'
            }`}
            >
            All Meds
            </button>
            {meds.map(med => (
            <button
                key={med.id}
                onClick={() => setSelectedMedId(med.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 border ${
                selectedMedId === med.id 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-transparent text-text border-gray-300'
                }`}
            >
                {med.name}
            </button>
            ))}
        </div>
      </div>

      <div className="h-px bg-separator w-full opacity-50 mb-6"></div>

      {/* Chart Section */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-lg text-text">Weekly Overview</h3>
            <span className="text-success font-black text-2xl">92%</span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#5f5e5e', fontWeight: 600 }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}
              />
              <Bar dataKey="score" radius={[4, 4, 4, 4]} barSize={16}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score === 100 ? '#4cd964' : (entry.score < 70 ? '#ff3b30' : '#007aff')} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="h-px bg-separator w-full opacity-50 mb-6"></div>

      {/* Calendar Section */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-text">October 2025</h3>
            <div className="flex gap-1">
                <button className="p-2 hover:bg-gray-200/50 rounded-full transition-colors"><ChevronLeft size={20} className="text-inactive" /></button>
                <button className="p-2 hover:bg-gray-200/50 rounded-full transition-colors"><ChevronRight size={20} className="text-inactive" /></button>
            </div>
        </div>
        
        {renderCalendar()}
        
        <div className="flex justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-xs font-bold text-inactive">
                <div className="w-2 h-2 rounded-full bg-success"></div> Taken
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-inactive">
                <div className="w-2 h-2 rounded-full bg-warning"></div> Late
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-inactive">
                <div className="w-2 h-2 rounded-full bg-danger"></div> Missed
            </div>
        </div>
      </div>
    </div>
  );
};