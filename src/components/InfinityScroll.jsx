import { Loader2 } from "lucide-react";
import { Children, useEffect, useRef, useState } from "react";

function InfiniteScroll({ children, getMore, invokeHeight = 10, bottomSensitive = 50, className, scrollDivRef }) {
   const [lockScroll, setLockScroll] = useState(false);
   const [page, setPage] = useState(0);
   const [numberMessage, setNumberMessage] = useState(children.length);
   const [prevScrollHeight, setPrevScrollHeight] = useState(0);
   const [scrollBottom, setScrollBottom] = useState(0);
   const loaderRef = useRef()
   const endMessageRef = useRef()
   // console.log("number", numberMessage);
   // console.log("page", page);
   useEffect(() => {
      if (children.length === 0) return;
      if (children.length === numberMessage) return;

      setNumberMessage(children.length);
      if (page === 0){
         setPage(1)
         return
      }
      
      // Check if the scroll bar was in the bottom before the new message come
      if(scrollBottom < bottomSensitive) {
         scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight
         setScrollBottom(0)
      }
   }, [children.length]);

   useEffect(() => {
      if (page === 0) return;
      if (page === 1) {
         scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight
         return
      }
      scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight - prevScrollHeight
      setLockScroll(false)
   }, [page]);

   const handleScroll = async(e) => {
      // Set scroll Bottom
      const currentScrollTop = scrollDivRef.current.scrollTop
      const currentClientHeight = scrollDivRef.current.clientHeight
      const currentScrollHeight = scrollDivRef.current.scrollHeight
      setScrollBottom(currentScrollHeight - (currentScrollTop + currentClientHeight))
      if (lockScroll) return;
      
      // Check if there is any scroll bar
      const scrollDiv = e.currentTarget;
      if (Math.abs(scrollDiv.clientHeight - scrollDiv.scrollHeight) < 10) return;

      const scrollTop = scrollDiv.scrollTop;
      if (scrollTop < invokeHeight) {
         setLockScroll(true);
         const nData = await getMore();
         if(nData === 0) {
            loaderRef.current.classList.add("hidden")
            endMessageRef.current.classList.remove("hidden")
         }
         setPage((prev) => prev + 1);
         setPrevScrollHeight(scrollDiv.scrollHeight);
      }
   };
   return (
      <div className={`overflow-y-scroll ${className}`} onScroll={handleScroll} ref={scrollDivRef}>
         <div className="w-full flex items-center justify-center">
            <Loader2 className="w-5 h-5 my-4 animate-spin" ref={loaderRef}/>
            <p className="text-lg font-medium hidden" ref={endMessageRef}> Nothing more !</p>
         </div>
         {children}
      </div>
   );
}

export {InfiniteScroll}
