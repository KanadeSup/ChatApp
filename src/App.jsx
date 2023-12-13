import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers";
import { HubContext } from "./contexts/HubContext";
import { useHubContext } from "./hooks/useHubContext";
import { useEffect, useState } from "react";
import InfiniteScroll from "./components/InfinityScroll";

const App = function () {
  const [hub, setHub] = useHubContext();
  return (
      //<HubContext.Provider value={[hub, setHub]}>
        <RouterProvider router={router} />
      //</HubContext.Provider>
  );
};
const node = document.querySelector("#root");
const root = createRoot(node);
root.render(<App />);


// const fetchData = () => {
//   return [
//     "1", "2", "3", "4", "5", "6", "7", "8", "9","10"
//   ]
// }
// const Infinity = () => {
//   const [message, setMessage] = useState([])
//   const [force, setForce] = useState({})
//   const [height, setHeight] = useState()
//   const [page, setPage] = useState(0)
//   const getData = ()=>{
//     const data = fetchData()
//     setPage((prev)=>++prev)
//     setMessage((prev) => [...data, ...prev])
//     console.log("Call")
//   }
//   useEffect(()=>{
//     getData()
//   },[])
//   return (
//     <InfiniteScroll
//       getMore={getData}
//       invokeHeight={10}
//       className={"view flex flex-col gap-5 w-40 ml-96 border border-red-500 p-3 rounded mt-10 h-[200px] overflow-y-scroll"}
//     >
//         {
//           message.map((m,i) => {
//             return (
//               <div key={i} className="border border-black "> {m} </div>
//             )
//           })
//         }
//     </InfiniteScroll>
//   ) 
// }
// export default function App () {
//   return (
//       <Infinity />
//   )
// }
// const node = document.querySelector("#root");
// const root = createRoot(node);
// root.render(<Infinity />);