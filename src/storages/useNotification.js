import {create} from 'zustand';

const useNotification = create(set => ({
    unreadCount: 0,
    setUnreadCount: (value) => set(() => ({ unreadCount: value })),
  }));

export default useNotification;