import {create} from 'zustand';

const useInfo = create(set => ({
    workspace: null,
    user: null,
    setWorkspace: (value) => set(() => ({ workspace: value })),
    setUser: (value) => set(() => ({ user: value })),
  }));

export default useInfo;