import { ArrowDownToLine, Trash2 } from "lucide-react";
import { useState } from "react";
import { imgFile, typeFile } from "@/utils/supportImgFile";
function Display(file, allowImageDisplay) {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
        if (!allowImageDisplay)
            return (
                <>
                    <div className="relative">
                        <img
                            src={imgFile(file.name, file.url)}
                            alt=""
                            className="w-10 h-10 min-w-[40px]"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[10px] font-medium text-white">
                            {typeFile(file.name)}
                        </div>
                    </div>

                    <div className="flex flex-col ml-2">
                        <span className="font-semibold text-sm truncate w-36">
                            {file.name}
                        </span>
                        <span className="text-xs font-medium text-gray-500 truncate w-48 mt-1.5">
                            {file.type}
                        </span>
                    </div>
                </>
            );

        return (
            <img
                src={file.url}
                alt=""
                className="max-h-[200px] xl:max-h-[270px] 2xl:max-h-xs h-auto"
            />
        );
    } else if (fileType.startsWith("video/")) {
        return (
            <video
                src={file.url}
                controls
                className="max-h-[250px] xl:max-h-[280px] 2xl:max-h-[350px] object-cover"
            ></video>
        );
    } else if (fileType.startsWith("audio/")) {
        return (
            <audio
                src={file.url}
                controls
                className="max-w-[300px] object-cover"
            ></audio>
        );
    } else {
        return (
            <>
                <div className="relative">
                    <img
                        src={imgFile(file.name, file.url)}
                        alt=""
                        className="w-10 h-10 min-w-[40px]"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[10px] font-medium text-white">
                        {typeFile(file.name)}
                    </div>
                </div>

                <div className="flex flex-col ml-2">
                    <span className="font-semibold text-sm truncate w-36">
                        {file.name}
                    </span>
                    <span className="text-xs font-medium text-gray-500 truncate w-48 mt-1.5">
                        {file.type}
                    </span>
                </div>
            </>
        );
    }
}

export default function FileCard({
    file,
    DeleteFile,
    allowDeletion,
    allowImageDisplay,
}) {
    const [isHover, setIsHover] = useState(false);
    const downloadFile = () => {
        const link = document.createElement("a");
        link.href = file.url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div
                onClick={() => {
                    window.open(file.url, "_blank");
                }}
                className="flex items-center px-4 py-3 select-none min-w-[333px] 2xl:min-w-[360px] max-w-fit bg-white cursor-pointer border border-slate-300 rounded-xl"
            >
                {Display(file, allowImageDisplay)}
            </div>
            {isHover && (
                <div className="absolute flex flex-row gap-2 border border-slate-300 px-2 py-0.5 rounded-sm top-2 right-3 bg-white">
                    <ArrowDownToLine className="h-6 w-6 p-1 text-gray-600 rounded-[1px] hover:bg-gray-200" onClick={downloadFile}/>
                    {allowDeletion && (
                        <Trash2
                            onClick={() => DeleteFile(file.id)}
                            className="h-6 w-6 p-1 text-gray-600 rounded-[1px] hover:bg-gray-200"
                        />
                    )}
                </div>
            )}
        </div>
    );
}
