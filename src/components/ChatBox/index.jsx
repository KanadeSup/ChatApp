import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  SendHorizontal,
} from "lucide-react";
import React from "react";

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "Write the messages ... ",
    emptyEditorClass:
      "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-mauve-11 before:opacity-50 before-pointer-events-none",
  }),
  Underline,
];

const ChatBox = React.forwardRef((props, ref) => {
  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class: "outline-none overflow-y-auto max-h-56",
      },
    },
  });
  return (
    <div
      ref={ref}
      className="border border-gray-500 rounded-md mx-3 my-3 py-1 px-2"
    >
      {/* Format bar */}
      <div className="flex">
        <button
          className="hover:bg-red-400 w-7 h-7 rounded text-lg flex justify-center items-center"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold strokeWidth={3} className="p-1" />
        </button>

        <button
          className="hover:bg-red-400 w-7 h-7 rounded text-lg flex justify-center items-center"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="p-1" />
        </button>

        <button
          className="hover:bg-red-400 w-7 h-7 rounded text-lg flex justify-center items-center"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="p-1" />
        </button>
      </div>
      {/* Chatbox */}
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const message = editor.getHTML();
            props.SendMessage(message);
            editor.commands.clearContent(true);
          }
        }}
        className="outline-none mt-1 mb-2 relative max-w-[calc(100vw-25rem)]"
      >
        <EditorContent className="pr-10" editor={editor} spellCheck="false" />
        <SendHorizontal
          onClick={() => {
            const message = editor.getHTML();
            props.SendMessage(message);
            editor.commands.clearContent(true);
          }}
          strokeWidth={1.25}
          className="absolute cursor-pointer bottom-0 right-0"
        />
      </div>
    </div>
  );
});

export default ChatBox;
