import { create } from 'zustand'

export default create((set)=>({
   accessToken: null,
   setToken: (token) => set((state)=>({accessToken: token})),
   removeToken: (token) =>set((state)=>({accessToken: null}))
}))
