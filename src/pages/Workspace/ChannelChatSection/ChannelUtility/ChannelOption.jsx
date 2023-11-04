import { useState } from "react";
import Assets from "./Assets";

export default function ChannelOption(props) {
  const [showAssets, setShowAssets] = useState(false);
  return (
    <>
      <div className="font-medium py-2 px-5 border-b shadow text-base">
        # channel 1
      </div>

      {/* Pinned Message */}
      <div
        className="flex flex-row  pl-5 py-2 mt-2 cursor-pointer group text-gray-600 hover:bg-bold-blue hover:text-white"
        onClick={() => props.setSelectedOption("pinnedMessageList")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-6 h-6 text-gray-600 group-hover:text-white"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 14.5l-.767-.641A1 1 0 006 15.5v-1zm12 0v1a1 1 0 00.767-1.641L18 14.5zm-7 6a1 1 0 102 0h-2zM7.5 5.71c.242.962.5 2.426.5 4.29h2c0-2.05-.284-3.678-.561-4.78l-1.94.49zM8 10c0-.107.029-.112-.043.05a4.872 4.872 0 01-.281.52c-.258.425-.611.93-.98 1.426a44.624 44.624 0 01-1.432 1.825l-.024.029-.006.007-.001.001a4548.037 4548.037 0 011.534 1.283h.001l.002-.003.007-.008.027-.032a31.95 31.95 0 00.445-.547c.286-.357.67-.844 1.054-1.363.382-.516.779-1.079 1.084-1.582a6.79 6.79 0 00.399-.746c.092-.208.214-.525.214-.86H8zm10 4.5l.767-.641-.001-.002-.006-.007-.024-.029a46.675 46.675 0 01-1.433-1.825c-.368-.496-.721-1-.979-1.426a4.872 4.872 0 01-.28-.52C15.97 9.888 16 9.893 16 10h-2c0 .335.122.652.214.86.106.24.247.495.4.746a21.36 21.36 0 001.083 1.582 46.636 46.636 0 001.5 1.91l.026.032.007.008.002.002v.001L18 14.5zM9.54 5h5.244V3H9.541v2zM16 10c0-.21.099-.922.26-1.887.155-.918.346-1.955.493-2.734l-1.965-.371a146.53 146.53 0 00-.5 2.773C14.14 8.671 14 9.581 14 10h2zM6 15.5h6v-2H6v2zm6 0h6v-2h-6v2zm-1-1v6h2v-6h-2zM14.784 5h0l.002.001.003.004v.003l1.964.371A2.006 2.006 0 0014.784 3v2zm-5.345.22a.216.216 0 01.04-.168.163.163 0 01.05-.048C9.537 5 9.539 5 9.541 5V3C8.079 3 7.185 4.461 7.499 5.71l1.94-.49z"
          ></path>
        </svg>
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          Pinned messages
        </span>
      </div>
      {/* All Member */}
      <div
        className="flex flex-row pl-5 py-2 cursor-pointer group text-gray-600 hover:bg-bold-blue hover:text-white"
        onClick={() => props.setSelectedOption("allMember")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-6 h-6 text-gray-600 group-hover:text-white"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M3 18a6.002 6.002 0 018.018-5.652c.343.122.671.275.982.455A5.965 5.965 0 0115 12a6.002 6.002 0 016 6v3h-5.25v-1.5h3.75V18a4.5 4.5 0 00-6.188-4.172A5.98 5.98 0 0115 18v3H3v-3zm6-6.75A3.748 3.748 0 015.25 7.5 3.75 3.75 0 0112 5.25a3.75 3.75 0 110 4.5 3.733 3.733 0 01-3 1.5zM13.5 18v1.5h-9V18a4.5 4.5 0 119 0zM11.25 7.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM15 5.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          All memmber
        </span>
      </div>
      {/* Media, files, links */}
      <div
        className="flex flex-row pl-5 py-2 cursor-pointer group text-gray-600 hover:bg-bold-blue hover:text-white"
        onClick={() => setShowAssets(!showAssets)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className={`w-6 h-6 py-1 text-gray-600 group-hover:text-white transform transition-transform duration-200 ${showAssets ? 'rotate-90' : ''}`}
        >
          <path
            fill="currentColor"
            d="M8.489 31.975a1.073 1.073 0 01-.757-1.831L21.99 15.88 7.94 1.83c-.417-.417-.417-1.098 0-1.515s1.098-.417 1.515 0l14.807 14.807a1.074 1.074 0 010 1.515L9.247 31.659a1.078 1.078 0 01-.757.316z"
          ></path>
        </svg>
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          Media, files, links
        </span>
      </div>
      {/* Assets */}
      {showAssets && <Assets setSelectedOption={props.setSelectedOption}/>}

      {/* Channel setting */}
      <div className="flex flex-row pl-5 py-2 cursor-pointer group text-gray-600 hover:bg-bold-blue hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className="w-6 h-6 py-0.5 text-gray-600 group-hover:text-white"
        >
          <path
            fill="currentColor"
            d="M600.704 64a32 32 0 0130.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0134.432 15.36L944.32 364.8a32 32 0 01-4.032 37.504l-77.12 85.12a357.12 357.12 0 010 49.024l77.12 85.248a32 32 0 014.032 37.504l-88.704 153.6a32 32 0 01-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 01600.704 960H423.296a32 32 0 01-30.464-22.208L357.696 828.48a351.616 351.616 0 01-42.56-24.64l-112.32 24.256a32 32 0 01-34.432-15.36L79.68 659.2a32 32 0 014.032-37.504l77.12-85.248a357.12 357.12 0 010-48.896l-77.12-85.248A32 32 0 0179.68 364.8l88.704-153.6a32 32 0 0134.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 01423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 00-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 000 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0034.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0034.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 000-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 00-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 110 384 192 192 0 010-384zm0 64a128 128 0 100 256 128 128 0 000-256z"
          ></path>
        </svg>
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          Channel setting
        </span>
      </div>
    </>
  );
}
