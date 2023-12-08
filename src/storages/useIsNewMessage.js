import {create} from 'zustand';
// Tạo store Zustand
const useIsNewMessage = create(set => ({
    isNewMessage: false,
    setIsNewMessage: (value) => set(() => ({ isNewMessage: value })),
  }));

export default useIsNewMessage;