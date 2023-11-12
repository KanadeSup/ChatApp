import { create } from 'zustand'

export default create((set)=>({
   accessToken: null,
   setToken: (token) => set((state)=>({accessToken: "Bearer " + token})),
   removeToken: (token) =>set((state)=>({accessToken: null}))
}))
