import React, { useState } from 'react';
import { Medication } from '../types';
import { Plus, ChevronRight, Pill, Syringe, Circle, HelpCircle, X, Check } from 'lucide-react';

interface MyMedsTabProps {
  meds: Medication[];
  onAddMed: (med: Omit<Medication, 'id' | 'takenToday' | 'color'>) => void;
}

export const MyMedsTab: React.FC<MyMedsTabProps> = ({ meds, onAddMed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    type: 'tablet' | 'capsule' | 'injection' | 'other' | '';
    name: string;
    duration: string;
    dosage: string;
    time: string;
    frequency: string;
  }>({
    type: '',
    name: '',
    duration: '',
    dosage: '',
    time: '',
    frequency: ''
  });

  const openModal = () => {
    setFormData({ type: '', name: '', duration: '', dosage: '', time: '', frequency: '' });
    setStep(1);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleNext = () => {
    if (step === 1 && formData.type) {
      setStep(2);
    } else if (step === 2) {
      // Basic validation
      if (!formData.name || !formData.time) return;
      
      onAddMed({
        name: formData.name,
        dosage: formData.dosage || 'Standard',
        frequency: formData.frequency || 'Daily',
        time: formData.time,
        type: formData.type as any,
        duration: formData.duration
      });
      closeModal();
    }
  };

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
       <h2 className="text-2xl font-extrabold text-text text-center mb-4">What kind of med is it?</h2>
       <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'tablet', label: 'Tablet', icon: Circle },
            { id: 'capsule', label: 'Capsule', icon: Pill },
            { id: 'injection', label: 'Injection', icon: Syringe },
            { id: 'other', label: 'Other', icon: HelpCircle },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => updateForm('type', item.id)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all ${
                formData.type === item.id 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-gray-300 bg-transparent text-inactive hover:border-primary/50'
              }`}
            >
              <item.icon size={32} strokeWidth={1.5} />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
       </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold text-text text-center mb-6">Medication Details</h2>
      
      <div className="space-y-4">
         {/* Name - Added as essential even if not explicitly in brief prompt */}
         <div className="space-y-1">
            <label className="text-xs font-bold text-inactive uppercase ml-1">Medication Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => updateForm('name', e.target.value)}
              placeholder="e.g. Ibuprofen"
              className="w-full bg-transparent border-2 border-gray-300 rounded-xl px-4 py-3 font-bold text-text focus:outline-none focus:border-primary transition-colors placeholder-gray-400"
            />
         </div>

         <div className="space-y-1">
            <label className="text-xs font-bold text-inactive uppercase ml-1">Time duration</label>
            <input 
              type="text"
              value={formData.duration}
              onChange={(e) => updateForm('duration', e.target.value)}
              placeholder="e.g. 7 days, Ongoing"
              className="w-full bg-transparent border-2 border-gray-300 rounded-xl px-4 py-3 font-bold text-text focus:outline-none focus:border-primary transition-colors placeholder-gray-400"
            />
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs font-bold text-inactive uppercase ml-1">Doses</label>
                <input 
                type="text"
                value={formData.dosage}
                onChange={(e) => updateForm('dosage', e.target.value)}
                placeholder="e.g. 10mg"
                className="w-full bg-transparent border-2 border-gray-300 rounded-xl px-4 py-3 font-bold text-text focus:outline-none focus:border-primary transition-colors placeholder-gray-400"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold text-inactive uppercase ml-1">Time</label>
                <input 
                type="time"
                value={formData.time}
                onChange={(e) => updateForm('time', e.target.value)}
                className="w-full bg-transparent border-2 border-gray-300 rounded-xl px-4 py-3 font-bold text-text focus:outline-none focus:border-primary transition-colors"
                />
            </div>
         </div>

         <div className="space-y-1">
            <label className="text-xs font-bold text-inactive uppercase ml-1">Days a week</label>
             <input 
              type="text"
              value={formData.frequency}
              onChange={(e) => updateForm('frequency', e.target.value)}
              placeholder="e.g. Daily, Mon/Wed/Fri"
              className="w-full bg-transparent border-2 border-gray-300 rounded-xl px-4 py-3 font-bold text-text focus:outline-none focus:border-primary transition-colors placeholder-gray-400"
            />
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-4 pb-24 overflow-y-auto no-scrollbar bg-bg relative">
       <div className="flex justify-between items-center px-6 mb-6">
        <h1 className="text-3xl font-extrabold text-text tracking-tight">My Meds</h1>
        <button 
          onClick={openModal}
          className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm"
        >
            <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-col border-t border-separator/60">
        {meds.map((med) => (
            <div key={med.id} className="group py-5 px-6 flex items-center justify-between border-b border-separator/60 bg-transparent hover:bg-black/[0.02] transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                    <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm"
                        style={{ backgroundColor: med.color }}
                    >
                        {med.type === 'injection' ? <Syringe size={20} /> : 
                         med.type === 'capsule' ? <Pill size={20} /> :
                         med.type === 'tablet' ? <Circle size={18} /> :
                         med.name.substring(0, 1)}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text leading-tight">{med.name}</h3>
                        <p className="text-inactive text-sm font-medium mt-0.5">{med.dosage} • {med.frequency}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-text bg-transparent border border-gray-200 px-2 py-1 rounded-md">{med.time}</span>
                    <ChevronRight size={20} className="text-gray-300" />
                </div>
            </div>
        ))}
        {meds.length === 0 && (
            <div className="p-8 text-center text-inactive">
                No medications yet. Add one to get started.
            </div>
        )}
      </div>

      <div className="px-6 mt-8">
          <button 
            onClick={openModal}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 font-bold hover:border-primary hover:text-primary transition-colors bg-transparent"
          >
              <Plus size={20} className="mr-2" />
              Add Medication
          </button>
      </div>

      {/* Full Screen Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
            <div className="bg-[#fffcf4] w-full max-w-md h-[90vh] sm:h-auto rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col border-t-0 sm:border-0 overflow-hidden animate-in slide-in-from-bottom-10 duration-200">
                {/* Modal Header */}
                <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200/50 bg-[#fffcf4]">
                    <h3 className="font-bold text-lg text-text">Add New Med</h3>
                    <button onClick={closeModal} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <X size={20} className="text-text" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 flex-1 overflow-y-auto bg-[#fffcf4]">
                    {step === 1 ? renderStep1() : renderStep2()}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-200/50 bg-[#fffcf4]">
                    <button 
                        onClick={handleNext}
                        disabled={step === 1 && !formData.type}
                        className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                            (step === 1 && !formData.type) 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-primary hover:bg-blue-600 shadow-lg shadow-blue-200'
                        }`}
                    >
                        {step === 1 ? 'Next' : 'Start Tracking'}
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};