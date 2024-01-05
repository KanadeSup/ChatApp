import { useEditor, EditorContent } from "@tiptap/react";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";
import { X, FileUp, ListOrdered, List, WrapText } from "lucide-react";
import { uploadFiles } from "../../api";
import InformDialog from "../InformDialog";
import { imgFile, typeFile } from "@/utils/supportImgFile";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import style from "../style.module.css";
import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import MentionList from "./MentionList.jsx";
import CharacterCount from "@tiptap/extension-character-count";

const limit = 4000;

// import suggestion from "./suggestion.js";

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
const CustomMention = Mention.extend({
    renderHTML(props) {
        const { node } = props;
        return [
            "div",
            {
                class: "text-bold-blue bg-blue-100 rounded-md px-1",
                userkey: node.attrs.id,
                "data-username": node.attrs.label,
                "data-linked-resource-type": "userinfo",
                href: `/user/${node.attrs.id}`,
                onclick: () => {
                    alert("hello");
                },
            },

            `@${node.attrs.label}`,
        ];
    },
});

const ChatBox = React.forwardRef((props) => {
    const extensions = [
        StarterKit,
        Placeholder.configure({
            placeholder: "Write the messages ... ",
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
        CharacterCount.configure({
            limit,
        }),
    ];

    if (props.isMention) {
        extensions.push(
            Mention.configure({
                HTMLAttributes: {
                    class: "text-bold-blue bg-blue-100 rounded-md px-1",
                    // onclick: 'window.open("https://nhattruyenup.com", "_blank")',
                },
                renderLabel({ options, node }) {
                    return `${options.suggestion.char}${
                        node.attrs.label ?? node.attrs.id
                    }`;
                },
                suggestion: {
                    items: async ({ query }) => {
                        const data = await props.getMembersChannel();
                        return data
                            .filter((item) =>
                                item.firstName
                                    .toLowerCase()
                                    .startsWith(query.toLowerCase())
                            )
                            .slice(0, 5);
                    },

                    render: () => {
                        let component;
                        let popup;

                        return {
                            onStart: (props) => {
                                component = new ReactRenderer(MentionList, {
                                    props,
                                    editor: props.editor,
                                });

                                if (!props.clientRect) {
                                    return;
                                }

                                popup = tippy("body", {
                                    getReferenceClientRect: props.clientRect,
                                    appendTo: () => document.body,
                                    content: component.element,
                                    showOnCreate: true,
                                    interactive: true,
                                    trigger: "manual",
                                    placement: "bottom-start",
                                });
                            },

                            onUpdate(props) {
                                component.updateProps(props);

                                if (!props.clientRect) {
                                    return;
                                }

                                popup[0].setProps({
                                    getReferenceClientRect: props.clientRect,
                                });
                            },

                            onKeyDown(props) {
                                if (props.event.key === "Escape") {
                                    popup[0].hide();

                                    return true;
                                }

                                return component.ref?.onKeyDown(props);
                            },

                            onExit() {
                                popup[0].destroy();
                                component.destroy();
                            },
                        };
                    },
                },
            })
        );
    }

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
    const [isHaveFile, setIsHaveFile] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isHoverUpload, setIsHoverUpload] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [allowEnterSend, setAllowEnterSend] = useState(true);

    const handleFileUpload = async (event) => {
        console.log("event: ", event.target.value);
        const allFiles = Array.from(event.target.files);
        const newFiles = allFiles.filter(
            (file) => file.size <= 30 * 1024 * 1024 // Kiểm tra kích thước file (<= 30MB)
        );
        console.log("newFiles: ", newFiles);

        if (allFiles.length !== newFiles.length) {
            // Nếu có file lớn hơn 30MB
            setIsOpenDialog(true);
        }

        const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
        console.log("totalSize: ", totalSize);

        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setIsHaveFile(true);
    };

    function handleRemoveFile(e, index) {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
        if (newFiles.length === 0) setIsHaveFile(false);
        refFile.current.value = null;
    }

    function handlePaste(e) {
        const { items } = e.clipboardData;
        const files = [];
        for (const item of items) {
            if (item.kind === "file") {
                const file = item.getAsFile();
                files.push(file);
            }
        }
        if (files.length > 0) {
            setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
            setIsHaveFile(true);
        }
    }

    async function handleSend() {
        if (isSending) return; // Nếu đang gửi, không làm gì cả
        setIsSending(true); // Đặt trạng thái gửi thành true

        const contentHtml = editor.getHTML();
        console.log("contentHtml: ", contentHtml);
        const content = ref.current.textContent;

        if (isHaveFile) {
            try {
                const res = await Promise.all(
                    selectedFiles.map((file) => uploadFiles([file]))
                );
                console.log("res file large: ", res);
                const resFile = res.map((file) => file[0]);
                console.log("resFile: ", resFile);
                await props.SendMessage(contentHtml, resFile);

                editor.commands.clearContent(true);
                setSelectedFiles([]);
                setIsHaveFile(false);
                refFile.current.value = null;
            } catch (error) {
                console.error(error);
            }
        } else if (content) {
            try {
                await props.SendMessage(contentHtml, null);
                editor.commands.clearContent(true);
            } catch (error) {
                console.error(error);
            }
        }

        setIsSending(false); // Đặt trạng thái gửi thành false khi hoàn tất
    }

    return (
        <div className="border border-gray-500 rounded-md mx-3 my-3 py-1 px-2 min-w-[360px]">
            {/* Format bar */}
            {isOpenDialog && (
                <InformDialog
                    setIsOpenDialog={setIsOpenDialog}
                    title="File to large"
                    content=" That file is too large and cannot be uploaded. The limit is 30MB."
                />
            )}
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
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <UnderlineIcon className="p-1" />
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={
                        "rounded hover:bg-gray-400 w-7 h-7 " +
                        (editor?.isActive("bulletList") ? "bg-gray-300" : "")
                    }
                >
                    <List className="p-1" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        "rounded hover:bg-gray-400 w-7 h-7 " +
                        (editor?.isActive("orderedList") ? "bg-gray-300" : "")
                    }
                >
                    <ListOrdered className="p-1" />
                </button>

                <button
                    className="rounded hover:bg-gray-400 w-7 h-7"
                    onClick={() =>
                        editor.chain().focus().splitListItem("listItem").run()
                    }
                    disabled={!editor?.can().splitListItem("listItem")}
                >
                    <WrapText className="p-1" />
                </button>

                {/* Up file */}
                <div className="relative">
                    <FileUp
                        className="w-7 h-7 p-1.5 cursor-pointer text-slate-700"
                        onClick={() => refFile.current.click()}
                        onMouseEnter={() => setIsHoverUpload(true)}
                        onMouseLeave={() => setIsHoverUpload(false)}
                    />
                    <input
                        type="file"
                        ref={refFile}
                        style={{ display: "none" }}
                        multiple
                        onChange={handleFileUpload}
                    />
                    {isHoverUpload && (
                        <>
                            <div className="absolute z-20 w-2 h-2 right-2.5 bottom-9 bg-black transform rotate-45"></div>
                            <div className="absolute flex items-center justify-center h-6 text-xs w-32 -top-9 -left-5 rounded-sm bg-black text-white">
                                Upload file {`(<30MB)`}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* Chatbox */}
            <div
                onKeyDown={(e) => {
                    console.log("isMention: ", props.isMention);
                    if (!props.isMention && e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                        console.log("chay cai chat don");
                        return;
                    }
                    if (props.isMention) {
                        if (e.shiftKey && e.key === "@") {
                            setAllowEnterSend(false);
                            console.log("shift + 2 flase");
                            return;
                        }
                        if (e.key === "Enter") {
                            setAllowEnterSend(true);
                            console.log("enter true");
                        }
                        if (
                            allowEnterSend &&
                            e.key === "Enter" &&
                            !e.shiftKey
                        ) {
                            console.log("allowEnterSend: ", allowEnterSend);
                            e.preventDefault();
                            handleSend();
                        }
                    }
                }}
                onPaste={handlePaste}
                className="outline-none mt-1 mb-2 relative max-w-[calc(100vw-5rem)] lg:max-w-[calc(100vw-25rem)] min-w-[250px]"
                ref={ref}
            >
                <EditorContent
                    className={style.messageDiv + " pr-10"}
                    editor={editor}
                    spellCheck="false"
                />
                <button
                    className="absolute cursor-pointer w-8 h-6 flex items-center justify-center rounded-sm bg-green-700 bottom-0 right-0 hover:bg-green-600"
                    disabled={isSending}
                    onClick={() => {
                        handleSend();
                    }}
                >
                    {isSending ? (
                        <AiOutlineLoading3Quarters
                            strokeWidth={1.25}
                            className="cursor-pointer text-white mr-0.5 animate-spin"
                        />
                    ) : (
                        <IoIosSend
                            strokeWidth={1.25}
                            className="cursor-pointer text-white mr-0.5 rotate-45"
                        />
                    )}
                </button>
            </div>

            {/* Hiển thị các file upload */}
            <div className="flex flex-row my-2 gap-4 flex-wrap">
                {selectedFiles.map((file, index) => (
                    <div key={index}>
                        {file.type.startsWith("image/") ? (
                            <div className="relative border rounded-lg group">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                    className="w-14 h-14 object-cover rounded-lg"
                                />
                                <X
                                    className="absolute -top-1.5 invisible group-hover:visible -right-2 w-4 h-4 p-0.5 bg-slate-600 text-white rounded-full cursor-pointer"
                                    onClick={(e) => handleRemoveFile(e, index)}
                                />
                            </div>
                        ) : (
                            <div className="relative flex flex-row justify-start px-4 py-2 border rounded-lg w-56 group">
                                <img
                                    src={imgFile(
                                        file.name,
                                        URL.createObjectURL(file)
                                    )}
                                    alt=""
                                    className="w-10 h-10"
                                />
                                <div className="flex flex-col justify-center ml-2">
                                    <span className="font-semibold text-base truncate w-44 pr-2">
                                        {file.name}
                                    </span>
                                </div>
                                <X
                                    className="absolute -top-1.5 -right-2 w-4 h-4 p-0.5 invisible group-hover:visible bg-slate-600 text-white rounded-full cursor-pointer"
                                    onClick={(e) => handleRemoveFile(e, index)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="character-count w-full flex justify-end text-xs">
                {editor?.storage.characterCount.characters()}/{limit}
            </div>
        </div>
    );
});

export default ChatBox;
