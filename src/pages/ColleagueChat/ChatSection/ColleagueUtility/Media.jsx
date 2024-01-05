import getFiles from "@/api/file/getFiles";
import { useState, useEffect } from "react";

export default function Media(props) {
    const [media, setMedia] = useState(null);
    useEffect(() => {
        async function getMediaChannel() {
            const result = await getFiles(
                props.conversationId,
                0,
                10,
                1,
                false
            );
            setMedia(result);
            console.log(result);
        }
        getMediaChannel();
    }, [props.conversationId]);
    return (
        <>
            <div className="font-medium text-sm flex items-center py-2 px-3 border-b-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="relative top-0.5 w-6 h-6 p-1 rounded-full hover:bg-slate-300"
                    onClick={() => props.setSelectedOption("")}
                >
                    <path
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M5 12l6-6m-6 6l6 6"
                    ></path>
                </svg>
                <span className="ml-2 text-sm">Media, Files</span>
            </div>

            <div className="flex flex-row justify-evenly py-2 font-medium text-gray-600 text-sm">
                <div className="cursor-pointer px-2 py-1 border-b-2 border-gray-600">
                    Media
                </div>
                <div
                    className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-500"
                    onClick={() => props.setSelectedOption("files")}
                >
                    Files
                </div>
                {/* <div
          className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-500"
          onClick={() => props.setSelectedOption("links")}
        >
          Links
        </div> */}
            </div>

            {/* Media */}
            <div
                style={{ height: "calc(100vh - 11rem)" }}
                className="grid grid-cols-2 auto-rows-auto w-full overflow-y-scroll px-2 mt-5"
            >
                {media === null ? (
                    <div className="text-center w-full">Loading...</div>
                ) : media?.length === 0 ? (
                    <div className="text-center w-full">No media</div>
                ) : (
                    media?.map((file) => (
                        <img
                            className=" p-1 w-full object-cover cursor-pointer"
                            src={file.url}
                            alt=""
                            onClick={() => {window.open(file.url)}}
                        />
                    ))
                )}
            </div>
        </>
    );
}
