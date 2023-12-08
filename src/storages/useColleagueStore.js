import {create} from 'zustand';
// Tạo store Zustand
const useChatStore = create(set => ({
    isChatOption: false,
    isNewChat: false,
    isClickedReply: false,
    setIsChatOption: (value) => set(() => ({ isChatOption: value })),
    setIsNewChat: (value) => set(() => ({ isNewChat: value })),
    setIsClickedReply: (value) => set(() => ({ isClickedReply: value })),
  }));

export default useChatStore;