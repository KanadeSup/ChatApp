import FileCard from "./FileCard";
import { useState, useEffect } from "react";
export default function FileList({ files, allowDeletion, DeleteFile }) {
  const [allowImageDisplay, setAllowImageDisplay] = useState(true);
  const videoFiles = files.filter((file) => file.type.startsWith("video/"));
  const audioFiles = files.filter((file) => file.type.startsWith("audio/"));
  const imageFiles = files.filter((file) => file.type.startsWith("image/"));
  const otherFiles = files.filter(
    (file) =>
      !file.type.startsWith("video/") &&
      !file.type.startsWith("audio/") &&
      !file.type.startsWith("image/")
  );

  useEffect(() => {
    if (videoFiles.length > 0 || audioFiles.length > 0) {
      setAllowImageDisplay(false);
    }
    if (files.length === imageFiles.length) {
      setAllowImageDisplay(true);
    } else if (files.length > 6) {
      setAllowImageDisplay(false);
    }
  }, [videoFiles, audioFiles]);
  return (
    <>
      <div className="w-full">
        {videoFiles.map((file, index) => (
          <FileCard
            key={index}
            file={file}
            allowDeletion={allowDeletion}
            DeleteFile={DeleteFile}
            allowImageDisplay={allowImageDisplay}
          />
        ))}
      </div>
      {audioFiles.map((file, index) => (
        <FileCard
          key={index}
          file={file}
          allowDeletion={allowDeletion}
          DeleteFile={DeleteFile}
          allowImageDisplay={allowImageDisplay}
        />
      ))}
      {imageFiles.map((file, index) => (
        <FileCard
          key={index}
          file={file}
          allowDeletion={allowDeletion}
          DeleteFile={DeleteFile}
          allowImageDisplay={allowImageDisplay}
        />
      ))}
      {otherFiles.map((file, index) => (
        <FileCard
          key={index}
          file={file}
          allowDeletion={allowDeletion}
          DeleteFile={DeleteFile}
          allowImageDisplay={allowImageDisplay}
        />
      ))}
    </>
  );
}
