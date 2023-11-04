import { useState } from "react";

export default function ChannelItem() {
  const [isHoveredSetting, setIsHoveredSetting] = useState(false);
  const [isHoveredChannel, setIsHoveredChannel] = useState(false);
  return (
    <div
      className="hover:bg-gray-200 flex flex-row items-center justify-between px-1 py-1 rounded-md select-none"
      onMouseEnter={() => setIsHoveredChannel(true)}
      onMouseLeave={() => setIsHoveredChannel(false)}
    >
      <span># channel 1</span>

      {isHoveredChannel && (
        <div
          className="relative"
          onMouseEnter={() => setIsHoveredSetting(true)}
          onMouseLeave={() => setIsHoveredSetting(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="w-6 h-6 stroke-gray-500 hover:stroke-gray-800 cursor-pointer"
            viewBox="0 0 24 24"
          >
            <g
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              clipRule="evenodd"
            >
              <path d="M11.018 19a.736.736 0 01-.721-.627.806.806 0 00-.535-.623 5.686 5.686 0 01-.66-.28.763.763 0 00-.795.052.704.704 0 01-.926-.077l-.967-.992a.787.787 0 01-.08-.995.857.857 0 00.062-.837 5.883 5.883 0 01-.22-.576.851.851 0 00-.65-.6.786.786 0 01-.651-.776v-1.241a.902.902 0 01.741-.9.981.981 0 00.722-.607c.037-.089.076-.177.117-.264.165-.327.142-.72-.06-1.024a.923.923 0 01.092-1.169l.71-.729a.994.994 0 011.307-.11l.022.016a1.05 1.05 0 001.018.1c.358-.132.62-.447.694-.829l.01-.034c.08-.506.506-.878 1.006-.878h.857c.514 0 .952.38 1.036.9l.015.07c.07.366.32.67.66.8.328.144.705.107 1-.1l.049-.036a1.02 1.02 0 011.342.111l.654.672c.328.338.37.87.098 1.257a1.11 1.11 0 00-.071 1.089l.042.1c.136.341.432.589.786.658a.975.975 0 01.803.966V12.6a.86.86 0 01-.706.854.938.938 0 00-.71.648 6.281 6.281 0 01-.153.4.939.939 0 00.076.9.855.855 0 01-.085 1.083l-.908.932a.736.736 0 01-.967.081.798.798 0 00-.839-.05c-.19.097-.386.183-.585.257a.834.834 0 00-.538.641.76.76 0 01-.74.654h-1.352z"></path>
              <path d="M13.975 12c0 1.289-1.019 2.333-2.275 2.333S9.425 13.289 9.425 12c0-1.289 1.019-2.333 2.275-2.333s2.275 1.044 2.275 2.333z"></path>
            </g>
          </svg>
          {isHoveredSetting && (
            <>
              <div className="absolute z-20 w-2 h-2 right-2 bottom-8 bg-black transform rotate-45"></div>

              <div className="absolute flex justify-center items-center w-32 h-6 z-20 bottom-9 -right-10 bg-black text-white text-xs rounded-md">
                <span>Setting this channel</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
