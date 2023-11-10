import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import router from './routers'
import useTokenStore from "/storages/useTokenStore"

localStorage.setItem("token", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhNjk5YzVjZS05Zjg0LTQ4MjEtZGE0NC0wOGRiZTAxOTQzZmYiLCJFbWFpbCI6IlVzZXJAZ21haWwuY29tIiwiVXNlcm5hbWUiOiJVc2VyIiwiSXNBY3RpdmUiOiJUcnVlIiwibmJmIjoxNjk5NjI2MTU3LCJleHAiOjE2OTk2MzY5NTcsImlhdCI6MTY5OTYyNjE1NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.2aTbtg5ZjZhBi0Z4fi1fNDqLBfIUnL5xU3mgPsA0Lbo")
const App = function(){
   return (
      <RouterProvider router={router} />
   )
} 
const node = document.querySelector("#root")
const root = createRoot(node)
root.render(<App />)
