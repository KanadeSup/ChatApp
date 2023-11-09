import { useState } from "react";
import Emoji from "/components/Emoij";

export default function Message(props) {
  const [showEmoij, setShowEmoij] = useState(false);

  const [isHoveredPin, setIsHoveredPin] = useState(false);
  const [isHoveredReply, setIsHoveredReply] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [isHoverViewReply, setIsHoverViewReply] = useState(false);

  return (
    <div
      className="mx-2 border-b border-gray-300 relative group"
      onMouseLeave={() => setShowEmoij(false)}
    >
      <div
        className="flex w-full my-2 hover:bg-gray-100 rounded-md p-3 mb-4"
        style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
      >
        <div className="flex-shrink-0 mr-2">
          <img
            className="h-9 w-9 rounded-md"
            src="https://www.famousbirthdays.com/headshots/russell-crowe-8.jpg"
          />
        </div>

        <div className="">
          <div className="flex relative bottom-1">
            <span className="font-bold text-sm">username</span>
            <span className="text-gray-500 text-xs ml-2 flex items-center">
              28/08/2023 1:50 AM
            </span>
          </div>

          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quae
            incidunt officiis distinctio veniam error maiores sit accusamus
            facere tenetur laudantium at excepturi voluptates nostrum commodi
            neque fugiat provident earum?
          </div>

          {/*-- Reply --*/}
          <div
            className="flex relative select-none -left-1 flex-row mt-1 w-1/2 min-w-[240px] py-1 rounded-md cursor-pointer border border-transparent hover:border-gray-400 transition-all duration-200"
            onMouseEnter={() => setIsHoverViewReply(true)}
            onMouseLeave={() => setIsHoverViewReply(false)}
            onClick={() => {
              props.setIsClickedReply(true);
              if (props.setIsClickedChannelUtility) {
                props.setIsClickedChannelUtility(false);
              }
            }}
          >
            <div className="text-xs text-bold-blue ml-1 mr-2 hover:underline">
              1 replies
            </div>
            {isHoverViewReply ? (
              <>
                <div className="text-xs text-gray-500 flex-grow">
                  View reply
                </div>
                <svg
                  className="w-3 h-3 mt-0.5 mr-3"
                  viewBox="0 0 512 512"
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z" />
                </svg>
              </>
            ) : (
              <div className="text-xs text-gray-500">
                Last reply at 11:10 10/10/2023
              </div>
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
          className="hover:bg-gray-200 p-1"
          onClick={() => setShowEmoij(!showEmoij)}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M10,22 C5.581722,22 2,18.418278 2,14 C2,9.581722 5.581722,6 10,6 C14.418278,6 18,9.581722 18,14 C18,18.418278 14.418278,22 10,22 Z M10,20 C13.3137085,20 16,17.3137085 16,14 C16,10.6862915 13.3137085,8 10,8 C6.6862915,8 4,10.6862915 4,14 C4,17.3137085 6.6862915,20 10,20 Z M13,15 C13,16.6568542 11.6568542,18 10,18 C8.34314575,18 7,16.6568542 7,15 L13,15 Z M8,13 C8.55228475,13 9,12.5522847 9,12 C9,11.4477153 8.55228475,11 8,11 C7.44771525,11 7,11.4477153 7,12 C7,12.5522847 7.44771525,13 8,13 Z M12,13 C12.5522847,13 13,12.5522847 13,12 C13,11.4477153 12.5522847,11 12,11 C11.4477153,11 11,11.4477153 11,12 C11,12.5522847 11.4477153,13 12,13 Z M20,4 L21,4 C21.5522847,4 22,4.44771525 22,5 C22,5.55228475 21.5522847,6 21,6 L20,6 L20,7 C20,7.55228475 19.5522847,8 19,8 C18.4477153,8 18,7.55228475 18,7 L18,6 L17,6 C16.4477153,6 16,5.55228475 16,5 C16,4.44771525 16.4477153,4 17,4 L18,4 L18,3 C18,2.44771525 18.4477153,2 19,2 C19.5522847,2 20,2.44771525 20,3 L20,4 Z"
              id="Shape"
              fill="#000000"
            ></path>
          </svg>
          {showEmoij && <Emoji />}
        </div>

        {/* Pin */}
        <div
          className="relative hover:bg-gray-200 p-1"
          onMouseEnter={() => setIsHoveredPin(true)}
          onMouseLeave={() => setIsHoveredPin(false)}
        >
          <svg
            className="w-5 h-5 py-0.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9894 4.9502L16.52 4.42014V4.42014L15.9894 4.9502ZM19.0716 8.03562L18.541 8.56568L19.0716 8.03562ZM8.73837 19.429L8.20777 19.9591L8.73837 19.429ZM4.62169 15.3081L5.15229 14.7781L4.62169 15.3081ZM17.5669 14.9943L17.3032 14.2922L17.5669 14.9943ZM15.6498 15.7146L15.9136 16.4167H15.9136L15.6498 15.7146ZM8.3322 8.38177L7.62798 8.12375L8.3322 8.38177ZM9.02665 6.48636L9.73087 6.74438V6.74438L9.02665 6.48636ZM5.84504 10.6735L6.04438 11.3965L5.84504 10.6735ZM7.30167 10.1351L6.86346 9.52646L6.86346 9.52646L7.30167 10.1351ZM7.67582 9.79038L8.24665 10.2768H8.24665L7.67582 9.79038ZM14.251 16.3805L14.742 16.9475L14.742 16.9475L14.251 16.3805ZM13.3806 18.2012L12.6574 18.0022V18.0022L13.3806 18.2012ZM13.9169 16.7466L13.3075 16.3094L13.3075 16.3094L13.9169 16.7466ZM2.71846 12.7552L1.96848 12.76L1.96848 12.76L2.71846 12.7552ZM2.93045 11.9521L2.28053 11.5778H2.28053L2.93045 11.9521ZM11.3052 21.3431L11.3064 20.5931H11.3064L11.3052 21.3431ZM12.0933 21.1347L11.7215 20.4833L11.7215 20.4833L12.0933 21.1347ZM11.6973 2.03606L11.8588 2.76845L11.6973 2.03606ZM1.4694 21.4699C1.17666 21.763 1.1769 22.2379 1.46994 22.5306C1.76298 22.8233 2.23786 22.8231 2.5306 22.5301L1.4694 21.4699ZM7.18383 17.8721C7.47657 17.5791 7.47633 17.1042 7.18329 16.8114C6.89024 16.5187 6.41537 16.5189 6.12263 16.812L7.18383 17.8721ZM15.4588 5.48026L18.541 8.56568L19.6022 7.50556L16.52 4.42014L15.4588 5.48026ZM9.26897 18.8989L5.15229 14.7781L4.09109 15.8382L8.20777 19.9591L9.26897 18.8989ZM17.3032 14.2922L15.386 15.0125L15.9136 16.4167L17.8307 15.6964L17.3032 14.2922ZM9.03642 8.63979L9.73087 6.74438L8.32243 6.22834L7.62798 8.12375L9.03642 8.63979ZM6.04438 11.3965C6.75583 11.2003 7.29719 11.0625 7.73987 10.7438L6.86346 9.52646C6.69053 9.65097 6.46601 9.72428 5.6457 9.95044L6.04438 11.3965ZM7.62798 8.12375C7.33502 8.92332 7.24338 9.14153 7.10499 9.30391L8.24665 10.2768C8.60041 9.86175 8.7823 9.33337 9.03642 8.63979L7.62798 8.12375ZM7.73987 10.7438C7.92696 10.6091 8.09712 10.4523 8.24665 10.2768L7.10499 9.30391C7.0337 9.38757 6.9526 9.46229 6.86346 9.52646L7.73987 10.7438ZM15.386 15.0125C14.697 15.2714 14.1716 15.4571 13.76 15.8135L14.742 16.9475C14.9028 16.8082 15.1192 16.7152 15.9136 16.4167L15.386 15.0125ZM14.1037 18.4001C14.329 17.5813 14.4021 17.3569 14.5263 17.1838L13.3075 16.3094C12.9902 16.7517 12.8529 17.2919 12.6574 18.0022L14.1037 18.4001ZM13.76 15.8135C13.5903 15.9605 13.4384 16.1269 13.3075 16.3094L14.5263 17.1838C14.5887 17.0968 14.6611 17.0175 14.742 16.9475L13.76 15.8135ZM5.15229 14.7781C4.50615 14.1313 4.06799 13.691 3.78366 13.3338C3.49835 12.9753 3.46889 12.8201 3.46845 12.7505L1.96848 12.76C1.97215 13.3422 2.26127 13.8297 2.61002 14.2679C2.95976 14.7073 3.47115 15.2176 4.09109 15.8382L5.15229 14.7781ZM5.6457 9.95044C4.80048 10.1835 4.10396 10.3743 3.58296 10.5835C3.06341 10.792 2.57116 11.0732 2.28053 11.5778L3.58038 12.3264C3.615 12.2663 3.71693 12.146 4.1418 11.9755C4.56523 11.8055 5.16337 11.6394 6.04438 11.3965L5.6457 9.95044ZM3.46845 12.7505C3.46751 12.6016 3.50616 12.4553 3.58038 12.3264L2.28053 11.5778C2.07354 11.9372 1.96586 12.3452 1.96848 12.76L3.46845 12.7505ZM8.20777 19.9591C8.83164 20.5836 9.34464 21.0987 9.78647 21.4506C10.227 21.8015 10.7179 22.0922 11.3041 22.0931L11.3064 20.5931C11.2369 20.593 11.0814 20.5644 10.721 20.2773C10.3618 19.9912 9.91923 19.5499 9.26897 18.8989L8.20777 19.9591ZM12.6574 18.0022C12.4133 18.8897 12.2462 19.4924 12.0751 19.9188C11.9033 20.3467 11.7821 20.4487 11.7215 20.4833L12.465 21.7861C12.974 21.4956 13.2573 21.0004 13.4671 20.4775C13.6776 19.9532 13.8694 19.2516 14.1037 18.4001L12.6574 18.0022ZM11.3041 22.0931C11.7112 22.0937 12.1114 21.9879 12.465 21.7861L11.7215 20.4833C11.595 20.5555 11.4519 20.5933 11.3064 20.5931L11.3041 22.0931ZM18.541 8.56568C19.6045 9.63022 20.3403 10.3695 20.7917 10.9788C21.2353 11.5774 21.2863 11.8959 21.2321 12.1464L22.6982 12.4634C22.8881 11.5854 22.5382 10.8162 21.9969 10.0857C21.4635 9.36592 20.6305 8.53486 19.6022 7.50556L18.541 8.56568ZM17.8307 15.6964C19.1921 15.1849 20.294 14.773 21.0771 14.3384C21.8718 13.8973 22.5083 13.3416 22.6982 12.4634L21.2321 12.1464C21.178 12.3968 21.0001 12.6655 20.3491 13.0268C19.6865 13.3946 18.7112 13.7632 17.3032 14.2922L17.8307 15.6964ZM16.52 4.42014C15.4841 3.3832 14.6481 2.54353 13.9246 2.00638C13.1908 1.46165 12.4175 1.10912 11.5357 1.30367L11.8588 2.76845C12.1086 2.71335 12.4277 2.7633 13.0304 3.21075C13.6433 3.66579 14.3876 4.40801 15.4588 5.48026L16.52 4.42014ZM9.73087 6.74438C10.2525 5.32075 10.6161 4.33403 10.9812 3.66315C11.3402 3.00338 11.609 2.82357 11.8588 2.76845L11.5357 1.30367C10.654 1.49819 10.1005 2.14332 9.66362 2.94618C9.23278 3.73793 8.82688 4.85154 8.32243 6.22834L9.73087 6.74438ZM2.5306 22.5301L7.18383 17.8721L6.12263 16.812L1.4694 21.4699L2.5306 22.5301Z"
              fill="#1C274C"
            ></path>
          </svg>

          {isHoveredPin && (
            <>
              <div className="absolute z-20 w-2 h-2 right-2.5 bottom-9 bg-black transform rotate-45"></div>

              <div className="absolute flex justify-center items-center w-24 h-6 z-20 bottom-10 -right-10 bg-black text-white text-xs rounded-md">
                <span>Pin a message</span>
              </div>
            </>
          )}
        </div>

        {/* Reply */}
        <div
          className="hover:bg-gray-200 p-1"
          onMouseEnter={() => setIsHoveredReply(true)}
          onMouseLeave={() => setIsHoveredReply(false)}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.0303 6.46967C10.3232 6.76256 10.3232 7.23744 10.0303 7.53033L6.31066 11.25L14.5 11.25C15.4534 11.25 16.8667 11.5298 18.0632 12.3913C19.298 13.2804 20.25 14.7556 20.25 17C20.25 17.4142 19.9142 17.75 19.5 17.75C19.0858 17.75 18.75 17.4142 18.75 17C18.75 15.2444 18.0353 14.2196 17.1868 13.6087C16.3 12.9702 15.2133 12.75 14.5 12.75L6.31066 12.75L10.0303 16.4697C10.3232 16.7626 10.3232 17.2374 10.0303 17.5303C9.73744 17.8232 9.26256 17.8232 8.96967 17.5303L3.96967 12.5303C3.67678 12.2374 3.67678 11.7626 3.96967 11.4697L8.96967 6.46967C9.26256 6.17678 9.73744 6.17678 10.0303 6.46967Z"
              fill="#1C274C"
            ></path>
          </svg>

          {isHoveredReply && (
            <>
              <div className="absolute z-20 w-2 h-2 right-10 bottom-9 bg-black transform rotate-45"></div>

              <div className="absolute flex justify-center items-center w-24 h-6 z-20 bottom-10 right-0 bg-black text-white text-xs rounded-md">
                <span>Reply a message</span>
              </div>
            </>
          )}
        </div>

        {/* Delete */}
        <div
          className="hover:bg-gray-200 p-1"
          onMouseEnter={() => setIsHoveredDelete(true)}
          onMouseLeave={() => setIsHoveredDelete(false)}
        >
          <svg
            className="w-5 h-5 py-0.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5001 6H3.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M9.5 11L10 16"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M14.5 11L14 16"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
              stroke="#1C274C"
              strokeWidth="1.5"
            ></path>{" "}
          </svg>

          {isHoveredDelete && (
            <>
              <div className="absolute z-20 w-2 h-2 right-3 bottom-9 bg-black transform rotate-45"></div>

              <div className="absolute flex justify-center items-center w-28 h-6 z-20 bottom-10 right-0 bg-black text-white text-xs rounded-md">
                <span>Delete this message</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
