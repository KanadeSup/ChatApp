import {create} from 'zustand';

const useChannelIdOfMeeting = create(set => ({
    channelIdOfMeeting: null,
    setChannelIdOfMeeting: (value) => set(() => ({ channelIdOfMeeting: value })),
  }));

export default useChannelIdOfMeeting;