import { Children, useEffect, useRef, useState } from "react";

export default function InfiniteScroll({ children, getMore, invokeHeight = 10, className }) {
   const [lockScroll, setLockScroll] = useState(false);
   const [page, setPage] = useState(0);
   const [numberMessage, setNumberMessage] = useState(children.length);
   const [prevScrollHeight, setPrevScrollHeight] = useState(0);
   const scrollElement = useRef();

   console.log("number", numberMessage);
   console.log("page", page);
   useEffect(() => {
      if (children.length === 0) return;
      if (children.length === numberMessage) return;

      setNumberMessage(children.length);
      setPage((prev) => prev + 1);
   }, [children.length]);

   useEffect(() => {
      if (page === 0) return;
      if (page === 1) {
         scrollElement.current.scrollTop = scrollElement.current.scrollHeight
         return
      }
      console.log("scroll trigger", prevScrollHeight)
      console.log("scroll trigger", scrollElement)
      scrollElement.current.scrollTop = scrollElement.current.scrollHeight - prevScrollHeight
      setLockScroll(false)
   }, [page]);

   const handleScroll = (e) => {
      if (lockScroll) return;
      const scrollDiv = e.currentTarget;
      // Check if there is any scroll bar
      if (Math.abs(scrollDiv.clientHeight - scrollDiv.scrollHeight) < 10) return;

      const scrollTop = scrollDiv.scrollTop;
      if (scrollTop < invokeHeight) {
         getMore();
         setPrevScrollHeight(scrollDiv.scrollHeight);
         setLockScroll(true);
      }
   };
   return (
      <div className={`overflow-y-scroll ${className}`} onScroll={handleScroll} ref={scrollElement}>
         {children}
      </div>
   );
}
