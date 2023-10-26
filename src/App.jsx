import { createRoot } from 'react-dom/client'
import CreateForm from './pages/WorkspaceManager/CreateForm.jsx'
import WList from './pages/WorkspaceManager/WorkspaceList.jsx'
import ChatBox from '/components/ChatBox'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import WManager from './pages/WorkspaceManager/'

const router = createBrowserRouter([
   {
      path: "/",
      element: <WManager />,
      children: [
         { index: true, element: <WList /> },
         {
            path: "CreateWorkspace",
            element: <CreateForm />
         }
      ]
   },
   {
      path: "/test",
      element: <ChatBox />
   }
])
const App = function(){
   return (
      <RouterProvider router={router} />
   )
} 
const node = document.querySelector("#root")
const root = createRoot(node)
root.render(<App />)
