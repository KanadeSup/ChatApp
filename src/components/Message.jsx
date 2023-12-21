import { useState } from "react";
import Emoji from "/components/Emoij";
import {
  ChevronRight,
  Pin,
  User2,
  SmilePlus,
  Reply,
  Trash2,
  Pencil,
  PinIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import convertTime from "../utils/convertTime";
import timeDifference from "../utils/timeDifferent";
import ChatBoxEdit from "@/components/ChatBoxEdit";
import { BsFillPinAngleFill } from "react-icons/bs";

export default function Message(props) {
  const [showEmoij, setShowEmoij] = useState(false);
  const [isHoveredPin, setIsHoveredPin] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredReply, setIsHoveredReply] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [isHoverViewReply, setIsHoverViewReply] = useState(false);
  const [editMessage, setEditMessage] = useState(false);

  return (
    <div
      className="mx-2 relative group"
      onMouseLeave={() => setShowEmoij(false)}
    >
      <div className={`flex flex-col  rounded-md ${props.message.isPined ? 'bg-[rgb(254,249,236)]' : 'hover:bg-gray-100'}`}>
        {props.message.isPined && (
          <div className="pt-1 mx-9 flex gap-2 items-center">
            <BsFillPinAngleFill className="w-3 h-3 text-yellow-600" />
            <span className="text-xs text-[rgb(96,94,90)]">Pinned</span>
          </div>
        )}
        {/* body tin nhắn */}
        <div
          className="flex w-full rounded-md p-2"
          style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
        >
          <div className="flex-shrink-0 mr-2">
            <Avatar>
              <AvatarImage src={props.message.senderAvatar} />
              <AvatarFallback className="bg-gray-300">
                <User2 />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="relative bottom-1 w-full max-w-[calc(100vw-28rem)]">
            <div className="flex items-baseline">
              <span className="font-bold font-sans text-sm cursor-pointer">
                {props.message.senderName}
              </span>
              <span className="text-gray-500 flex gap-2 font-medium text-xs ml-2 cursor-default">
                {convertTime(props.message.sendAt)}{" "}
                {/* {props.message.isPined && (
                  <span className="text-red-500 italic flex">
                    <PinIcon className="w-4 h-4" /> (pinned)
                  </span>
                )} */}
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
                <div
                  className="text-[15px] mt-1 leading-relaxed w-full break-all"
                  dangerouslySetInnerHTML={{ __html: props.message.content }}
                ></div>
                {props.message.isEdited ? (
                  <div className="text-xs text-gray-500">(edited)</div>
                ) : (
                  <></>
                )}
              </>
            )}

            {/*-- List Emoij --*/}
            <div className="flex justify-start flex-wrap items-center pt-1 gap-2">
              {props.message.reactionCount &&
                Object.entries(props.message.reactionCount)?.map(
                  ([emoji, count], index) => (
                    <div
                      key={index}
                      className="h-full border-[1.5px] px-0.5 bg-blue-50 border-bold-blue rounded-lg"
                    >
                      {emoji}{" "}
                      <span className="text-base text-bold-blue font-mono font-medium">
                        {count}
                      </span>
                    </div>
                  )
                )}
            </div>

            {/*-- View Reply --*/}
            {props.message.childCount ? (
              <div
                className="flex relative select-none -left-1 flex-row mt-1 w-1/2 min-w-[240px] max-w-[300px] py-[5px] rounded-md cursor-pointer border border-transparent hover:border-gray-400 transition-all duration-200 hover:bg-white"
                onMouseEnter={() => setIsHoverViewReply(true)}
                onMouseLeave={() => setIsHoverViewReply(false)}
                onClick={() => {
                  props.setMessage(props.message);
                  localStorage.setItem("idMessage", props.message.id);
                  props.setIsClickedReply(true);
                  if (props.setIsClickedChannelUtility) {
                    props.setIsClickedChannelUtility(false);
                  }
                }}
              >
                <div className="text-xs font-bold text-bold-blue ml-1 mr-2 hover:underline">
                  {props.message.childCount}{" "}
                  {props.message.childCount > 1 ? "replies" : "reply"}
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
                  {props.message.isPined ? "Unpin message" : "Pin message"}
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
