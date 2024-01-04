import { useState, useRef, useEffect } from "react";
import Emoji from "/components/Emoij";
import {
    ChevronRight,
    Pin,
    User2,
    SmilePlus,
    Reply,
    Trash2,
    Pencil,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatBoxEdit from "@/components/ChatBoxEdit";
import { BsFillPinAngleFill } from "react-icons/bs";
import { GoTriangleRight } from "react-icons/go";
import style from "./style.module.css";
import ViewLinkPreview from "./ViewLinkPreview";
import { getShortDatetimeSendAt } from "../utils/getShortDatetimeSendAt";
import FileList from "./FileList";
import HoverInformation from "./HoverInformation";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import convertTime from "../utils/convertTime";
import { Separator } from "@/components/ui/separator"
import parse, { domToReact } from "html-react-parser";
import checkTime from "../utils/checkTime";
import { useParams, useNavigate } from "react-router-dom";

function handleContent(content) {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("a").forEach((a) => {
        const url = new URL(a.href);
        a.textContent = url.hostname;
    });
    return doc.body.innerHTML;
}



export default function Message(props) {
    const [showEmoij, setShowEmoij] = useState(false);
    const [isOpenFile, setIsOpenFile] = useState(true);
    const [editMessage, setEditMessage] = useState(false);
    const [isHoveredPin, setIsHoveredPin] = useState(false);
    const [isHoveredEdit, setIsHoveredEdit] = useState(false);
    const [isHoveredReply, setIsHoveredReply] = useState(false);
    const [isHoveredDelete, setIsHoveredDelete] = useState(false);
    const [isHoverViewReply, setIsHoverViewReply] = useState(false);
    const refContent = useRef(null);
    const [links, setLinks] = useState([]);
    const [dataMeeting, setDataMeeting] = useState("");
    const { workspaceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (props.message.type === 1) {
            let data = JSON.parse(props.message.data);
            if (typeof data === "string") {
                data = JSON.parse(data);
            } else {
            }
            console.log("data Meetingkkk: ", data);
            setDataMeeting(data);
        }
    }, [props.message.data]);

    function displayBadgeByTimeMeeting() {
        if(!dataMeeting) return "";
        if (checkTime(dataMeeting.TimeStart, dataMeeting.TimeEnd) === 1) {
            return "bg-[rgb(25,142,97)]";
        }
        if (props.message.type === 1 && checkTime(dataMeeting.TimeStart, dataMeeting.TimeEnd) === 2) {
            return "bg-[rgb(230,80,80)]";
        }
        return "bg-[rgb(254,249,236)]";
    }

    function displayBackgroundMessageByTimeMeeting() {
        if(props.message.isPined) return "bg-[rgb(254,249,236)]";
        if(props.message.type === 0) return "hover:bg-slate-50";
        if (checkTime(dataMeeting.TimeStart, dataMeeting.TimeEnd) === 1) {
            return "bg-[rgb(227,255,243)]";
        }
        if (checkTime(dataMeeting.TimeStart, dataMeeting.TimeEnd) === 2) {
            return "bg-[rgb(255,236,236)]";
        }
        return "hover:bg-slate-50";
    }
    // Thêm hover khi có @mention
    // const options = {
    //     replace: (domNode) => {
    //         if (
    //             domNode.type === "tag" &&
    //             domNode.name === "span" &&
    //             domNode.attribs["data-type"] === "mention"
    //         ) {
    //             return (
    //                 <HoverInformation
    //                     name={props.message.senderName}
    //                     avatar={props.message.senderAvatar}
    //                     idUser={props.message.senderId}
    //                 >
    //                     <span className="text-bold-blue bg-blue-100 rounded-md px-1">@{domNode.attribs['data-label']}</span>
    //                 </HoverInformation>
    //             );
    //         }
    //     },
    // };
    // const content = parse(props.message.content, options);

    // lấy links để preview
    useEffect(() => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(
            props.message.content,
            "text/html"
        );
        const links = Array.from(htmlDoc.querySelectorAll("a")).map(
            (a) => a.href
        );
        setLinks(links);
    }, [props.message.content]);

    if (props.message.type === 2) {
        return (
            <div className="w-full py-1 text-center text-gray-500">
                {props.message.content}
            </div>
        );
    }
    return (
        <div
            id={props.id}
            className="mx-2 relative group min-w-[360px]"
            onMouseLeave={() => setShowEmoij(false)}
        >
            <div
                className={style.messageDiv + " flex flex-col rounded-md " + displayBackgroundMessageByTimeMeeting()}
            >
                {props.message.isPined && (
                    <div className="pt-1 mx-9 flex gap-2 items-center">
                        <BsFillPinAngleFill className="w-3 h-3 text-yellow-600" />
                        <span className="text-xs text-[rgb(96,94,90)]">
                            Pinned
                        </span>
                    </div>
                )}

                {/* body tin nhắn */}
                <div
                    className="flex w-full rounded-md p-2"
                    style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
                >
                    <div className="flex-shrink-0 mr-2">
                        {props.message.type === 1 ? (
                            <div className={displayBadgeByTimeMeeting() + " rounded-sm h-10 w-10 flex items-center justify-center"}>
                                <AiOutlineVideoCamera className="text-white w-6 h-6" />
                            </div>
                        ) : (
                            <HoverInformation
                                name={props.message.senderName}
                                avatar={props.message.senderAvatar}
                                idUser={props.message.senderId}
                            >
                                <Avatar>
                                    <AvatarImage
                                        src={props.message.senderAvatar}
                                    />
                                    <AvatarFallback className="bg-gray-300">
                                        <User2 />
                                    </AvatarFallback>
                                </Avatar>
                            </HoverInformation>
                        )}
                    </div>

                    <div className="relative bottom-1 w-full max-w-[calc(100vw-28rem)]">
                        <div className="flex items-baseline min-w-[200px]">
                            <span className="font-bold font-sans text-sm cursor-pointer">
                                {props.message.type === 1 ? (
                                    <>
                                        A meeting is started by{" "}
                                        {props.message.senderName}{" "}
                                        <Badge className={displayBadgeByTimeMeeting() + " hover:bg-[rgb(20,130,85)]"}>
                                            {checkTime(dataMeeting.TimeStart, dataMeeting.TimeEnd) === 1 ? "Happening" : checkTime(dataMeeting.TimeStart, dataMeeting.TimeEnd) === 2 ? "End" : "Early"}
                                        </Badge>
                                    </>
                                ) : (
                                    props.message.senderName
                                )}
                            </span>
                            <span className="text-gray-500 flex gap-2 font-medium text-xs ml-2 cursor-default">
                                {getShortDatetimeSendAt(props.message.sendAt)}
                            </span>
                        </div>
                        {/*-- Content --*/}
                        {editMessage ? (
                            <ChatBoxEdit
                                message={props.message}
                                UpdateMessage={props.UpdateMessage}
                                setEditMessage={setEditMessage}
                            />
                        ) : (
                            <>
                                {/* Hiển thị nội dung tin nhắn */}
                                <div
                                    ref={refContent}
                                    className={
                                        "text-[15px] font-sans mt-1 leading-snug w-full break-words min-w-[300px]" +
                                        (props.message.type === 1
                                            ? "text-gray-500"
                                            : "")
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: props.message.content,
                                    }}
                                >
                                    {/* {content} */}
                                </div>
                                {props.message.isEdited ? (
                                    <div className="text-xs text-gray-500">
                                        (edited)
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                        {/*-- Data meeting --*/}
                        {props.message.type === 1 && (
                            <Card className="w-[350px] my-2">
                                <CardTitle className="text-base text-center py-1">Meeting information</CardTitle>
                                <Separator className="w-full" />
                                <CardContent>
                                    <div className="grid grid-cols-7 w-full items-center text-sm mt-1">
                                        <div className="col-span-2 grid grid-rows-4">
                                            <span >Session ID:</span>
                                            <span>Password:</span>
                                            <span>Time start:</span>
                                            <span>Time end:</span>
                                        </div>
                                        <div className="col-span-5 grid grid-rows-4">
                                            <span>{dataMeeting.SessionId}</span>
                                            <span>{dataMeeting.Password}</span>
                                            <span>{convertTime(dataMeeting?.TimeStart)}</span>
                                            <span>{convertTime(dataMeeting?.TimeEnd)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        {/*--Join meeting--*/}
                        {props.message.type === 1 && checkTime(dataMeeting.TimeStart, dataMeeting.TimeEnd)===1 && (
                            <Button
                                variant="outline"
                                className="border border-[rgb(25,142,97)]"
                                onClick={() => { navigate(`/Workspace/${workspaceId}/Meeting/${dataMeeting.Id}/room`) }}
                            >
                                <div className="bg-[rgb(25,142,97)] w-7 h-7 mr-1 rounded-sm flex items-center justify-center">
                                    <AiOutlineVideoCamera className="w-4 h-4 text-white" />
                                </div>{" "}
                                <span className="font-semibold">
                                    Join meeting
                                </span>
                            </Button>
                        )}

                        {/*-- Files --*/}
                        {props.message.files?.length > 0 && (
                            <div>
                                <div className="flex items-center text-slate-600 text-sm gap-1 min-w-[200px]">
                                    <span>
                                        {props.message.files.length} files
                                    </span>{" "}
                                    <GoTriangleRight
                                        className={`w-4 h-4 cursor-pointer hover:bg-gray-200 rounded-full ${
                                            isOpenFile ? "rotate-90" : ""
                                        }`}
                                        onClick={() =>
                                            setIsOpenFile(!isOpenFile)
                                        }
                                    />
                                </div>

                                {isOpenFile && (
                                    <div className="flex flex-row flex-wrap gap-2 mt-1">
                                        <FileList
                                            files={props.message.files}
                                            allowDeletion={
                                                props.message.senderId ===
                                                localStorage.getItem("userId")
                                            }
                                            DeleteFile={(fileId) => {
                                                if (
                                                    refContent.current
                                                        .textContent === "" &&
                                                    props.message.files
                                                        .length === 1
                                                ) {
                                                    props.DeleteMessage(
                                                        props.message.id
                                                    );
                                                    return;
                                                }
                                                props.DeleteFile(fileId);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Links preview */}
                        <div className="flex flex-col gap-2">
                            {links.map((link, index) => (
                                <ViewLinkPreview
                                    key={index}
                                    url={link}
                                    className="w-4/5  min-w-[300px]"
                                />
                            ))}
                        </div>

                        {/*-- List Emoij --*/}
                        <div className="flex justify-start flex-wrap items-center pt-1 gap-2">
                            {props.message.reactionCount &&
                                Object.entries(
                                    props.message.reactionCount
                                )?.map(([emoji, count], index) => (
                                    <div
                                        key={index}
                                        className="h-full border-[1.5px] px-0.5 bg-blue-50 border-bold-blue cursor-pointer rounded-lg"
                                        onClick={() => props.SendEmoji(emoji)}
                                    >
                                        {emoji}{" "}
                                        <span className="text-base text-bold-blue font-mono font-medium">
                                            {count}
                                        </span>
                                    </div>
                                ))}
                        </div>

                        {/*-- View Reply --*/}
                        {props.message.childCount ? (
                            <div
                                className="flex relative select-none -left-1 flex-row mt-1 w-1/2 min-w-[240px] max-w-[300px] py-[5px] rounded-md cursor-pointer border border-transparent hover:border-gray-400 transition-all duration-200 hover:bg-white"
                                onMouseEnter={() => setIsHoverViewReply(true)}
                                onMouseLeave={() => setIsHoverViewReply(false)}
                                onClick={() => {
                                    props.setMessage(props.message);
                                    localStorage.setItem(
                                        "idMessage",
                                        props.message.id
                                    );
                                    props.setIsClickedReply(true);
                                    if (props.setIsClickedChannelUtility) {
                                        props.setIsClickedChannelUtility(false);
                                    }
                                }}
                            >
                                <div className="text-xs font-bold text-bold-blue ml-1 mr-2 hover:underline">
                                    {props.message.childCount}{" "}
                                    {props.message.childCount > 1
                                        ? "replies"
                                        : "reply"}
                                </div>
                                {isHoverViewReply ? (
                                    <>
                                        <div className="text-xs text-gray-500 flex-grow">
                                            View reply
                                        </div>
                                        <ChevronRight className="w-4 h-4" />
                                    </>
                                ) : (
                                    <div className="text-xs text-gray-500">
                                        Last reply at 11:10 10/10/2023
                                    </div>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>

            {/*-- Hover message --*/}
            <div
                style={{
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)", // This line adds the shadow
                }}
                className="absolute right-0 top-1 flex bg-white cursor-pointer rounded-md
            opacity-0 group-hover:opacity-100 transition-opacity
            "
            >
                {/* Emoij */}
                <div
                    className="hover:bg-gray-200 p-1.5"
                    onClick={() => setShowEmoij(!showEmoij)}
                >
                    <SmilePlus className="w-4 h-4 text-gray-600" />
                    {showEmoij && <Emoji SendEmoji={props.SendEmoji} />}
                </div>

                {/* Pin */}
                <div
                    className="relative hover:bg-gray-200 p-1.5"
                    onMouseEnter={() => setIsHoveredPin(true)}
                    onMouseLeave={() => setIsHoveredPin(false)}
                    onClick={() => props.PinMessage(props.message.id)}
                >
                    <Pin
                        className={`w-4 h-4 text-gray-600 ${
                            props.message.isPined ? "text-red-500" : ""
                        }`}
                    />

                    {isHoveredPin && (
                        <>
                            <div className="absolute z-20 w-2 h-2 right-2.5 bottom-9 bg-black transform rotate-45"></div>

                            <div className="absolute flex justify-center items-center w-28 h-6 z-20 bottom-10 -right-6 bg-black text-white text-xs rounded-md">
                                <span>
                                    {props.message.isPined
                                        ? "Unpin message"
                                        : "Pin message"}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {/* Edit */}
                {props.message.senderId === localStorage.getItem("userId") && (
                    <div
                        className="relative hover:bg-gray-200 p-1.5"
                        onMouseEnter={() => setIsHoveredEdit(true)}
                        onMouseLeave={() => setIsHoveredEdit(false)}
                        onClick={() => setEditMessage(!editMessage)}
                    >
                        <Pencil className="w-4 h-4 text-gray-600" />

                        {isHoveredEdit && (
                            <>
                                <div className="absolute z-20 w-2 h-2 right-2.5 bottom-9 bg-black transform rotate-45"></div>

                                <div className="absolute flex justify-center items-center w-24 h-6 z-20 bottom-10 -right-10 bg-black text-white text-xs rounded-md">
                                    <span>Edit message</span>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Reply */}
                <div
                    className="hover:bg-gray-100 p-1.5"
                    onClick={() => {
                        props.setIsClickedReply(true);
                        props.setMessage(props.message);
                        localStorage.setItem("idMessage", props.message.id);
                        if (props.setIsClickedChannelUtility) {
                            props.setIsClickedChannelUtility(false);
                        }
                    }}
                    onMouseEnter={() => setIsHoveredReply(true)}
                    onMouseLeave={() => setIsHoveredReply(false)}
                >
                    <Reply className="w-4 h-4 text-gray-600" />

                    {isHoveredReply && (
                        <>
                            <div className="absolute z-20 w-2 h-2 right-10 bottom-9 bg-black transform rotate-45"></div>

                            <div className="absolute flex justify-center items-center w-24 h-6 z-20 bottom-10 right-0 bg-black text-white text-xs rounded-md">
                                <span>Reply message</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Delete */}
                {props.message.senderId === localStorage.getItem("userId") && (
                    <div
                        className="hover:bg-gray-200 p-1.5"
                        onMouseEnter={() => setIsHoveredDelete(true)}
                        onMouseLeave={() => setIsHoveredDelete(false)}
                        onClick={() => props.DeleteMessage(props.message.id)}
                    >
                        <Trash2 className="w-4 h-4 text-gray-600" />

                        {isHoveredDelete && (
                            <>
                                <div className="absolute z-20 w-2 h-2 right-3 bottom-9 bg-black transform rotate-45"></div>
                                <div className="absolute flex justify-center items-center w-28 h-6 z-20 bottom-10 right-0 bg-black text-white text-xs rounded-md">
                                    <span>Delete this message</span>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
