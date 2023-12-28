import { useEditor, EditorContent } from "@tiptap/react";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";
import { ListOrdered, List, WrapText } from "lucide-react";
import React from "react";
import { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import style from "./style.module.css";

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => true,
    };
  },
});
const convertEnterToShiftEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      "Shift-Enter": ({ editor }) =>
        editor.commands.first(({ commands }) => [
          () => commands.splitListItem("listItem"),
          () => commands.newlineInCode(),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ]),
    };
  },
});

const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        return true;
      },
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
  convertEnterToShiftEnter,
  DisableEnter,
  ListItem,
  OrderedList,
  CustomBulletList,
  Link.configure({
    HTMLAttributes: {
      class: "text-bold-blue underline",
      target: "_blank",
    },
    protocols: ["http", "https", "mailto", "tel", "ftp"],
    validate: (href) => /^https?:\/\//.test(href),
  }),
];

const ChatBoxEdit = React.forwardRef((props) => {
  const editor = useEditor({
    extensions: extensions,
    content: props.message.content,
    editorProps: {
      attributes: {
        class: "outline-none overflow-y-auto max-h-40",
      },
    },
  });
  const ref = useRef(null);
  const [isSending, setIsSending] = useState(false);

  async function hanldeUpdate() {
    setIsSending(true);
    const contentHtml = editor.getHTML();
    const content = ref.current.textContent;
    if (content && contentHtml !== props.message.content) {
      await props.UpdateMessage(props.message.id, contentHtml);
      editor.commands.clearContent(true);
    }
    props.setEditMessage(false);
    setIsSending(false);
  }

  return (
    <div className="border border-gray-500 bg-white rounded-md mx-3 my-3 py-1 px-2">
      {/* Format bar */}
      <div className="flex">
        <button
          className={
            "rounded hover:bg-gray-400 w-7 h-7 " +
            (editor?.isActive("bold") ? "bg-gray-300" : "")
          }
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold strokeWidth={3} className="p-1" />
        </button>

        <button
          className={
            "rounded hover:bg-gray-400 w-7 h-7 " +
            (editor?.isActive("italic") ? "bg-gray-300" : "")
          }
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="p-1" />
        </button>

        <button
          className={
            "rounded hover:bg-gray-400 w-7 h-7 " +
            (editor?.isActive("underline") ? "bg-gray-300" : "")
          }
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="p-1" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            "rounded hover:bg-gray-400 w-7 h-7 " +
            (editor?.isActive("bulletList") ? "bg-gray-300" : "")
          }
        >
          <List className="p-1" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            "rounded hover:bg-gray-400 w-7 h-7 " +
            (editor?.isActive("orderedList") ? "bg-gray-300" : "")
          }
        >
          <ListOrdered className="p-1" />
        </button>

        <button
          className="rounded hover:bg-gray-400 w-7 h-7"
          onClick={() => editor.chain().focus().splitListItem("listItem").run()}
          disabled={!editor?.can().splitListItem("listItem")}
        >
          <WrapText className="p-1" />
        </button>
      </div>

      {/* Chatbox */}
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const contentHtml = editor.getHTML();
            const content = ref.current.textContent;
            if (content && contentHtml !== props.message.content) {
              props.UpdateMessage(props.message.id, contentHtml);
              editor.commands.clearContent(true);
            }
            props.setEditMessage(false);
          }
        }}
        className="outline-none mt-1 mb-2 flex flex-col relative max-w-[calc(100vw-25rem)]"
        ref={ref}
      >
        <EditorContent
          className={style.messageDiv + " pr-10"}
          editor={editor}
          spellCheck="false"
        />
        <div className="flex flex-row justify-end gap-2">
          <button
            className="cursor-pointer w-16 h-7 rounded-sm flex items-center border text-sm justify-center border-gray-400 bg-white hover:bg-gray-100"
            onClick={() => props.setEditMessage(false)}
          >
            Cancel
          </button>
          <button
            className=" cursor-pointer w-14 h-7 flex items-center justify-center rounded-sm bg-green-700  hover:bg-green-600"
            disabled={isSending}
            onClick={() => hanldeUpdate()}
          >
            {isSending ? (
              <AiOutlineLoading3Quarters
                strokeWidth={1.25}
                className="cursor-pointer text-white mr-0.5 animate-spin"
              />
            ) : (
              <p className="text-white text-sm font-medium">Save</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ChatBoxEdit;
