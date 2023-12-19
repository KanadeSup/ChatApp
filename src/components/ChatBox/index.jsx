import { useEditor, EditorContent } from "@tiptap/react";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";
import { Paperclip, X, FileUp } from "lucide-react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  SendHorizontal,
} from "lucide-react";
import React from "react";
import { useRef, useState } from "react";

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
    placeholder: "Write the messages ... ",
    emptyEditorClass:
      "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-mauve-11 before:opacity-50 before-pointer-events-none",
  }),
  Underline,
  DisableEnter,
];

const ChatBox = React.forwardRef((props) => {
  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class: "outline-none overflow-y-auto max-h-44",
      },
    },
  });
  const ref = useRef(null);
  const refFile = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileUpload = (event) => {
    setSelectedFiles([...event.target.files]);
    console.log("file: ", event.target.files);
  };

  function handleRemoveFile(index) {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  }

  return (
    <div
      //ref={ref}
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

        {/* Up file */}
        <FileUp
          className="w-7 h-7 p-1"
          onClick={() => refFile.current.click()}
        />
        <input
          type="file"
          ref={refFile}
          style={{ display: "none" }}
          multiple
          onChange={handleFileUpload}
        />
      </div>
      {/* Chatbox */}
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const contentHtml = editor.getHTML();
            const content = ref.current.textContent;
            if (content) {
              props.SendMessage(contentHtml);
              editor.commands.clearContent(true);
            }
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
            if (content) {
              props.SendMessage(contentHtml);
              editor.commands.clearContent(true);
            }
          }}
          strokeWidth={1.25}
          className="absolute cursor-pointer top-0 right-0"
        />
      </div>
      {/* Hiển thị các file upload */}
      <div className="flex flex-row my-2 gap-4 flex-wrap">
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <div className="relative flex flex-row justify-start px-4 py-2 border rounded-lg w-56">
              <img
                src="https://chat.zalo.me/assets/icon-word.d7db8ecee5824ba530a5b74c5dd69110.svg"
                alt=""
                className="w-8 h-8"
              />
              <div className="flex flex-col justify-center ml-2">
                <span className="font-semibold text-base truncate w-44 pr-2">{file.name}</span>
              </div>
              <X className="absolute -top-1.5 -right-2 w-4 h-4 p-0.5 bg-slate-600 text-white rounded-full cursor-pointer" onClick={() => handleRemoveFile(index)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ChatBox;
