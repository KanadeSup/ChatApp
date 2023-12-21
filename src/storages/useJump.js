import {create} from 'zustand';
// Tạo store Zustand
const useJump = create(set => ({
    jumpId: null,
    setJumpId: (value) => set(() => ({ jumpId: value })),
  }));

export default useJump;