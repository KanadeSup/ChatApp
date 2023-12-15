import {create} from 'zustand';
// Tạo store Zustand
const useChannelStore = create(set => ({
    isClickedChannelUtility: false,                // Trạng thái hiển thị chat option
    isNewChat: false,            // Trạng thái hiển thị new chat          
    isClickedReply: false,      // Trạng thái hiển thị reply
    messageParent: null,                // Lưu tin nhắn gồm reply để hiển thị ở reply box
    setIsClickedChannelUtility: (value) => set(() => ({ isClickedChannelUtility: value })),
    setIsNewChat: (value) => set(() => ({ isNewChat: value })),
    setIsClickedReply: (value) => set(() => ({ isClickedReply: value })),
    setMessageParent: (value) => set(() => ({ messageParent: value })),
  }));

export default useChannelStore;