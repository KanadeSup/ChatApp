import {create} from 'zustand';

const useNotification = create(set => ({
    unreadCount: 0,
    notifications : [],
    setUnreadCount: (value) => set(() => ({ unreadCount: value })),
    setNotifications: (value) => set(() => ({ notifications: value })),
  }));

export default useNotification;