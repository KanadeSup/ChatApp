import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
const extensions = [
   StarterKit,
   Placeholder.configure({
      placeholder: "Write the messages ... ",
      emptyEditorClass: 'cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-mauve-11 before:opacity-50 before-pointer-events-none',
   }),
   Underline,
]

const ChatBox = React.forwardRef((props, ref) => {
   const editor = useEditor({
      extensions: extensions,
      editorProps: {
         attributes:{
            class: "outline-none overflow-y-auto max-h-56"
         }
      }
   })
   return (
      <div ref={ref} className="border border-gray-500 rounded-md mx-3 my-3 py-1 px-2">
         {/* Format bar */}
         <div className="flex">
            <button 
               className="hover:bg-red-400 w-7 h-7 rounded text-lg flex justify-center items-center"
               onClick={()=> editor.chain().focus().toggleBold().run()}
            > 
               <svg
                  fill="#000000"
                  width="16px"
                  height="16px"
                  viewBox="-192 -192 2304.00 2304.00"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
                  stroke="#000000"
                  strokeWidth="5.76"
               >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                     id="SVGRepo_tracerCarrier"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     stroke="#CCCCCC"
                     strokeWidth="7.68"
                  />
                  <g id="SVGRepo_iconCarrier">
                     {" "}
                     <path
                        d="M480.286 822.857h548.571c151.269 0 274.286-123.017 274.286-274.286 0-151.268-123.017-274.285-274.286-274.285H480.286v548.571Zm0 822.857H1166c151.269 0 274.286-123.017 274.286-274.285 0-151.269-123.017-274.286-274.286-274.286H480.286v548.571ZM1166 1920H206V0h822.857c302.537 0 548.572 246.034 548.572 548.571 0 134.263-48.549 257.418-128.778 352.732 159.223 96.137 265.92 270.994 265.92 470.126 0 302.537-246.034 548.571-548.571 548.571Z"
                        fillRule="evenodd"
                     />{" "}
                  </g>
               </svg>
            </button>

            <button 
               className="hover:bg-red-400 w-7 h-7 rounded text-lg flex justify-center items-center"
               onClick={()=> editor.chain().focus().toggleItalic().run()}
            > 
               <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                     <path
                        d="M10 3H20M4 21H14M15 3L9 21"
                        stroke="#000000"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </g>
               </svg>
            </button>

            <button 
               className="hover:bg-red-400 w-7 h-7 rounded text-lg flex justify-center items-center"
               onClick={()=> editor.chain().focus().toggleUnderline().run()}
            > 
               <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                     <path
                        d="M5.5 17.25C5.08579 17.25 4.75 17.5858 4.75 18C4.75 18.4142 5.08579 18.75 5.5 18.75V17.25ZM19.5 18.75C19.9142 18.75 20.25 18.4142 20.25 18C20.25 17.5858 19.9142 17.25 19.5 17.25V18.75ZM16.25 6C16.25 5.58579 15.9142 5.25 15.5 5.25C15.0858 5.25 14.75 5.58579 14.75 6H16.25ZM9.5 13.143H8.75H9.5ZM10.25 6C10.25 5.58579 9.91421 5.25 9.5 5.25C9.08579 5.25 8.75 5.58579 8.75 6H10.25ZM5.5 18.75H19.5V17.25H5.5V18.75ZM14.75 6V13.143H16.25V6H14.75ZM14.75 13.143C14.75 14.3856 13.7426 15.393 12.5 15.393V16.893C14.5711 16.893 16.25 15.2141 16.25 13.143H14.75ZM12.5 15.393C11.2574 15.393 10.25 14.3856 10.25 13.143H8.75C8.75 15.2141 10.4289 16.893 12.5 16.893V15.393ZM10.25 13.143V6H8.75V13.143H10.25Z"
                        fill="#000000"
                     />
                  </g>
               </svg>

            </button>
         </div>

         {/* Chatbox */}
         <div className="outline-none mt-1 mb-2">
            <EditorContent editor={editor} spellCheck="false"/>
         </div>
      </div>
   )
});

export default ChatBox;
