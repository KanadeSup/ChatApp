import { useState } from "react";
import Emoji from "/components/Emoij";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import convertTime from "@/utils/convertTime";
import {
  Pin,
  User2,
  SmilePlus,
  Trash2,
  Pencil,
} from "lucide-react";
import ChatBoxEdit from "@/components/ChatBoxEdit";


export default function MessageReply(props) {
  const [showEmoij, setShowEmoij] = useState(false);
  const [isHoveredPin, setIsHoveredPin] = useState(false);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [editMessage, setEditMessage] = useState(false);

  return (
    <div
      className="mx-2 relative group"
      onMouseLeave={() => setShowEmoij(false)}
    >
      <div
        className="flex w-full bg-gray-50 hover:bg-gray-100 rounded-md p-3 mb-4"
        style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
      >
        <div className="flex-shrink-0 mr-2">
          <Avatar>
            <AvatarImage src={props.message?.senderAvatar} />
            <AvatarFallback className="bg-gray-300">
              <User2 />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="w-full">
          <div className="flex relative bottom-1">
            <span className="font-bold text-[15px]">
              {props.message?.senderName}
            </span>
            <span className="text-gray-500 text-xs ml-2 flex items-center">
              {props.message && convertTime(props.message?.sendAt)}
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
                className="text-[15px] leading-relaxed w-full break-all"
                dangerouslySetInnerHTML={{ __html: props.message.content }}
              ></div>
              {props.message.isEdited ? (
                <div className="text-xs text-gray-500">(edited)</div>
              ) : (
                <></>
              )}
            </>
          )}
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
          {showEmoij && <Emoji />}
        </div>

        {/* Pin */}
        <div
          className="relative hover:bg-gray-200 p-1.5"
          onMouseEnter={() => setIsHoveredPin(true)}
          onMouseLeave={() => setIsHoveredPin(false)}
        >
          <Pin className="w-4 h-4 text-gray-600" />

          {isHoveredPin && (
            <>
              <div className="absolute z-20 w-2 h-2 right-2.5 bottom-9 bg-black transform rotate-45"></div>

              <div className="absolute flex justify-center items-center w-20 h-6 z-20 bottom-10 -right-1 bg-black text-white text-xs rounded-md">
                <span>Pin message</span>
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

                <div className="absolute flex justify-center items-center w-24 h-6 z-20 bottom-10 -right-5 bg-black text-white text-xs rounded-md">
                  <span>Edit message</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Delete */}
        {props.message?.senderId === localStorage.getItem("userId") && (
          <div
            className="hover:bg-gray-200 p-1.5"
            onMouseEnter={() => setIsHoveredDelete(true)}
            onMouseLeave={() => setIsHoveredDelete(false)}
            onClick={() => props.DeleteMessage(props.message)}
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
