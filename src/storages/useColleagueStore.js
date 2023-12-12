import {create} from 'zustand';
// Tạo store Zustand
const useColleagueStore = create(set => ({
    isChatOption: false,                // Trạng thái hiển thị chat option
    isNewChat: false,            // Trạng thái hiển thị new chat          
    isClickedReply: false,      // Trạng thái hiển thị reply
    message: null,                // Tin nhắn
    setIsChatOption: (value) => set(() => ({ isChatOption: value })),
    setIsNewChat: (value) => set(() => ({ isNewChat: value })),
    setIsClickedReply: (value) => set(() => ({ isClickedReply: value })),
    setMessage: (value) => set(() => ({ message: value })),
  }));

export default useColleagueStore;