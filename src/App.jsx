import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers";
import { useEffect, useRef, useState } from "react";
import { InfiniteScroll } from "./components/InfinityScroll";
import OneSignal from "react-onesignal";
import config from "/appconfig.js";

const App = function () {
   useEffect(() => {
      try {
         initialize();
      } catch (e) {
        console.log("error", e)
      }
   }, []);
   // const [hub, setHub] = useHubContext();
   return (
      //<HubContext.Provider value={[hub, setHub]}>
      <RouterProvider router={router} />
      //</HubContext.Provider>
   );
};
const node = document.querySelector("#root");
const root = createRoot(node);
root.render(<App />);

const initialize = async () => {
   await OneSignal.init({
      appId: config.oneSignalKey,
   });
   var userId = localStorage.getItem("userId")
   if (userId != null) {
       OneSignal.logout()
       OneSignal.login(userId)
   }
}

// test
// const fetchData = () => {
//   return ["1","2","3","4"]
//   return [
//     "1", "2", "3", "4", "5", "6", "7", "8", "9","10"
//   ]
// }
// const sleep = (time) => (
//   new Promise(resolve => setTimeout(resolve, time))
// )

// const Infinity = () => {
//   const [message, setMessage] = useState([])
//   const ref = useRef()
//   const [forceScroll, setForceScroll] = useState({})
//   const [count, setCount] = useState(0)
//   // fetch data
//   const getData = async ()=>{
//     const data = fetchData()
//     if(count > 3) return 0
//     await sleep(1000)
//     setMessage((prev) => [...data, ...prev])
//     setCount(prev=>prev+1)
//     return 10
//   }
//   useEffect(()=>{
//     getData()
//   },[])

//   // scrollToBottom
//   const scrollToBottom = () => {
//     setForceScroll({})
//   }

//   // scroll to bottom
//   useEffect(()=>{
//     ref.current.scrollTop = ref.current.scrollHeight
//   },[forceScroll])

//   return (
//     <div className="flex items-center justify-center h-screen flex-col gap-10">
//     <InfiniteScroll
//         getMore={getData}
//         invokeHeight={10}
//         scrollDivRef={ref}
//         className={"view flex flex-col gap-5 w-40 border border-red-500 p-3 rounded h-[200px] overflow-y-scroll"}
//       >
//           {
//             message.map((m,i) => {
//               return (
//                 <div key={i} className="border border-black "> {m} </div>
//               )
//             })
//           }
//       </InfiniteScroll>
//       <div>
//         <button
//           className="bg-black px-3 py-1 rounded text-md font-medium text-white ml-3"
//           onClick={e=>{
//             setMessage([...message, "Receive Message"])
//           }}
//         >
//           receive message
//         </button>
//         <button
//           className="bg-black px-3 py-1 rounded text-md font-medium text-white ml-3"
//           onClick={e=>{
//             setMessage([...message, "Send Message"])
//             scrollToBottom()
//           }}
//         >
//           Send message
//         </button>
//       </div>
//     </div>

//   )
// }
// root.render(<Infinity />);
