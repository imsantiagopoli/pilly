import React, { useState, useEffect } from 'react';
import { Tab, Medication, HistoryLog } from './types';
import { HomeTab } from './components/HomeTab';
import { HistoryTab } from './components/HistoryTab';
import { MyMedsTab } from './components/MyMedsTab';
import { SettingsTab } from './components/SettingsTab';
import { BottomNav } from './components/BottomNav';
import { AIChatModal } from './components/AIChatModal';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Mock State
  const [meds, setMeds] = useState<Medication[]>([
    { id: '1', name: 'Lexapro', dosage: '10mg', frequency: 'Daily', time: '08:00', color: '#ffcc00', takenToday: true, type: 'tablet' },
    { id: '2', name: 'Vitamin D', dosage: '2000IU', frequency: 'Daily', time: '09:00', color: '#ff9500', takenToday: false, type: 'capsule' },
    { id: '3', name: 'Adderall', dosage: '20mg', frequency: 'Twice Daily', time: '13:00', color: '#ff3b30', takenToday: false, type: 'tablet' },
    { id: '4', name: 'Magnesium', dosage: '500mg', frequency: 'Daily', time: '21:00', color: '#5856d6', takenToday: false, type: 'other' },
  ]);

  const [historyLogs] = useState<HistoryLog[]>([]); // Populated in a real app

  const handleTakeMed = (id: string) => {
    setMeds(prev => prev.map(med => 
      med.id === id ? { ...med, takenToday: true } : med
    ));
    // In a real app, this would also add to historyLogs
  };

  const handleAddMed = (newMedData: Omit<Medication, 'id' | 'takenToday' | 'color'>) => {
    const colors = ['#ffcc00', '#ff9500', '#ff3b30', '#5856d6', '#4cd964', '#007aff'];
    const newMed: Medication = {
        ...newMedData,
        id: Date.now().toString(),
        takenToday: false,
        color: colors[Math.floor(Math.random() * colors.length)],
    };
    setMeds(prev => [...prev, newMed]);
  };

  const renderTab = () => {
    switch (currentTab) {
      case Tab.HOME:
        return <HomeTab meds={meds} onTakeMed={handleTakeMed} streak={7} />;
      case Tab.HISTORY:
        return <HistoryTab logs={historyLogs} meds={meds} />;
      case Tab.MY_MEDS:
        return <MyMedsTab meds={meds} onAddMed={handleAddMed} />;
      case Tab.SETTINGS:
        return <SettingsTab />;
      default:
        return <HomeTab meds={meds} onTakeMed={handleTakeMed} streak={7} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf4] text-[#333333] font-sans flex justify-center">
      <div className="w-full max-w-md bg-[#fffcf4] relative shadow-2xl min-h-screen">
        
        {/* Main Content Area */}
        <main className="h-full">
          {renderTab()}
        </main>

        {/* AI Modal */}
        <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Bottom Navigation */}
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  );
};

export default App;