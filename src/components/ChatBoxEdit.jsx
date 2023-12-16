import { useEditor, EditorContent } from "@tiptap/react";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  SendHorizontal,
} from "lucide-react";
import React from "react";
import { useRef } from "react";

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => true,
    };
  },
});

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "messages don't empty",
    emptyEditorClass:
      "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-mauve-11 before:opacity-50 before-pointer-events-none",
  }),
  Underline,
  DisableEnter,
];

const ChatBoxEdit = React.forwardRef((props) => {
  const editor = useEditor({
    extensions: extensions,
    content: props.message.content,
    editorProps: {
      attributes: {
        class: "outline-none overflow-y-auto max-h-56",
      },
    },
  });
  const ref = useRef(null);

  return (
    <div
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
            const contentHtml = editor.getHTML();
            const content = ref.current.textContent;
            if (content && contentHtml !== (props.message.content)) {
              props.UpdateMessage(props.message.id, contentHtml);
              editor.commands.clearContent(true);
            }
            props.setEditMessage(false);
          }
        }}
        className="outline-none mt-1 mb-2 relative max-w-[calc(100vw-25rem)]"
        ref={ref}
      >
        <EditorContent className="pr-10" editor={editor} spellCheck="false" />
        <SendHorizontal
          onClick={() => {
            const contentHtml = editor.getHTML();
            const content = ref.current.textContent;
            if (content && contentHtml !== props.message.content) {
              props.UpdateMessage(props.message.id, contentHtml);
              editor.commands.clearContent(true);
            }
            props.setEditMessage(false);
          }}
          strokeWidth={1.25}
          className="absolute cursor-pointer bottom-0 right-0"
        />
      </div>
    </div>
  );
});

export default ChatBoxEdit;
