export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string; // e.g., "Daily", "Twice Daily"
  time: string; // HH:mm
  color: string;
  takenToday: boolean;
  type?: 'tablet' | 'capsule' | 'injection' | 'other';
  duration?: string;
}

export interface HistoryLog {
  date: string; // YYYY-MM-DD
  medicationId: string;
  status: 'taken' | 'missed' | 'late';
}

export enum Tab {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  MY_MEDS = 'MY_MEDS',
  SETTINGS = 'SETTINGS',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}