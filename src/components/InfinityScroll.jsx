import { Loader2 } from "lucide-react";
import { Children, useEffect, useRef, useState } from "react";

function InfiniteScroll({ children, getMore, getMoreBottom, invokeHeight = 10, bottomSensitive = 50, className, scrollDivRef, jump }) {
   const [lockScroll, setLockScroll] = useState(false);
   const [lockScrollBottom, setLockScrollBottom] = useState(false);
   const [page, setPage] = useState(0);
   const [pageBottom, setPageBottom] = useState(0);
   const [numberMessage, setNumberMessage] = useState(children.length);
   const [prevScrollHeight, setPrevScrollHeight] = useState(0);
   const [prevScrollHeightBottom, setPrevScrollHeightBottom] = useState(0);
   const [scrollBottom, setScrollBottom] = useState(0);
   const loaderRef = useRef()
   const endMessageRef = useRef()
   
   
   useEffect(() => {
      if (children.length === 0){
         loaderRef.current.classList.add("hidden")
         return;
      }

      if (children.length === numberMessage) return;

      setNumberMessage(children.length);
      if (page === 0 && pageBottom === 0){
         setPage(1)
         setPageBottom(1)
         return
      }
      
      // Check if the scroll bar was in the bottom before the new message come
      if(scrollBottom < bottomSensitive) {
         scrollDivRef.current.scroll({top: scrollDivRef.current.scrollHeight, behavior: "smooth"})
         setScrollBottom(0)
      }
   }, [children.length]);

   useEffect(() => {
      if (page === 0) return;
      if (page === 1) {
         loaderRef.current.classList.remove("hidden")
         if(Math.abs(scrollDivRef.current.scrollHeight - scrollDivRef.current.clientHeight) < 200){
            loaderRef.current.classList.add("hidden")
            setLockScroll(true)
         }
         scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight
         return
      }
      scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight - prevScrollHeight
      setLockScroll(false)
   }, [page]);
   useEffect(()=> {
      if (pageBottom === 0) return;
      if (pageBottom === 1) {
         if(Math.abs(scrollDivRef.current.scrollHeight - scrollDivRef.current.clientHeight) < 200){
            setLockScrollBottom(true)
         }
         return
      }
      scrollDivRef.current.scrollTop = prevScrollHeightBottom
      setLockScrollBottom(false)

   },[pageBottom])

   useEffect(()=> {
      if(!jump) return
      scrollDivRef.current.scrollTop = document.querySelector(`#message-${jump}`).offsetTop - scrollDivRef.current.clientHeight/2
      setLockScrollBottom(false)
   },[jump])
   const handleScroll = async(e) => {
      // Set scroll Bottom
      const currentScrollTop = scrollDivRef.current.scrollTop
      const currentClientHeight = scrollDivRef.current.clientHeight
      const currentScrollHeight = scrollDivRef.current.scrollHeight
      setScrollBottom(currentScrollHeight - (currentScrollTop + currentClientHeight))

      // Check if there is any scroll bar
      const scrollDiv = e.currentTarget;
      if (Math.abs(scrollDiv.clientHeight - scrollDiv.scrollHeight) < 10) return;

      const scrollTop = scrollDiv.scrollTop;
      if (scrollTop < invokeHeight && !lockScroll) {
         setLockScroll(true);
         const nData = await getMore();
         if(nData === 0) {
            loaderRef.current.classList.add("hidden")
            endMessageRef.current.classList.remove("hidden")
            return
         }
         setPage((prev) => prev + 1);
         setPrevScrollHeight(scrollDiv.scrollHeight);
      }

      if(scrollDiv.scrollHeight - scrollTop - scrollDiv.clientHeight < 10 && !lockScrollBottom) {
         setLockScrollBottom(true);
         const nData = await getMoreBottom();
         console.log("ndata", nData)
         if(nData === 0) {
            return
         }
         setPageBottom((prev) => prev + 1);
         setPrevScrollHeightBottom(scrollDiv.scrollTop);
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
