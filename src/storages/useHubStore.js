import {create} from 'zustand';

const useHubStore = create(set => ({
    hub: null,
    setHub: (value) => set(() => ({ hub: value })),
  }));

export default useHubStore;