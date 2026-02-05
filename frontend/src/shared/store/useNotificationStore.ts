import { create } from 'zustand';

interface INotification {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface INotificationStore {
  notification: INotification | null;
  showNotification: (message: string, severity: INotification['severity']) => void;
  hideNotification: () => void;
}

export const useNotificationStore = create<INotificationStore>((set) => ({
  notification: null,
  showNotification: (message, severity) => set({ notification: { message, severity } }),
  hideNotification: () => set({ notification: null }),
}));
