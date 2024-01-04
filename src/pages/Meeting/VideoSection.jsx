import {
    Camera,
    CameraOff,
    LogOut,
    Mic,
    MicOff,
    Monitor,
    MonitorPlay,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UserVideo } from "./UserVideo";
import { useNavigate, useParams } from "react-router-dom";
import ReplySection from "../../components/ReplySection";

function VideoSection({
    shareScreen,
    subcribers,
    setSubcribers,
    publisher,
    setPublisher,
    leaveSession,
    defaultCamera,
    defaultMic,
}) {
    const [isMicEnable, setIsMicEnable] = useState(defaultMic);
    const [isCamEnable, setIsCamEnable] = useState(defaultCamera);
    const [isShareScreen, setIsShareScreen] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [pinnedUser, setPinnedUser] = useState(null);
    const { deviceType } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const datas = [];
        if (publisher) {
            datas.push(publisher);
        }
        subcribers.map((sub) => datas.push(sub));
        setParticipants(datas);
        if (pinnedUser) {
            datas.map((data) => {
                if (pinnedUser.id === data.id) {
                    setPinnedUser(data);
                }
            });
        }
    }, [publisher, subcribers]);

    function setParticipant(parti) {
        if (parti.id === publisher.id) {
            setPublisher({ ...parti });
            return;
        }
        for (let i = 0; i < subcribers; i++) {
            if (subcribers[i].id === parti.id) {
                subcribers[i] === parti;
                setSubcribers([...subcribers]);
                return;
            }
        }
    }
    return (
        <div className="w-full h-screen">
            <div className="w-full h-screen flex flex-col">
                {/* Pinned layout */}
                {pinnedUser !== null && !deviceType ? (
                    <div
                        className={`flex h-full items-center justify-items-center p-5 min-h-0 min-w-0 gap-5`}
                    >
                        {/* Main Stream */}
                        <div className="rounded-lg w-[75%] h-full flex">
                            <UserVideo
                                participant={pinnedUser}
                                setParticipant={setParticipant}
                                isPublisher={publisher.id === pinnedUser.id}
                                setPinnedUser={setPinnedUser}
                                className="w-full"
                            />
                        </div>

                        {/* Sub Stream */}
                        <div className="h-full w-[25%] flex flex-wrap items-start justify-between content-start gap-1 overflow-y-scroll">
                            {participants.length !== 0
                                ? participants
                                      .filter(
                                          (participant) =>
                                              participant.id !== pinnedUser.id
                                      )
                                      .map((participant) => (
                                          <UserVideo
                                              key={participant.id}
                                              setParticipant={setParticipant}
                                              participant={participant}
                                              isPublisher={
                                                  publisher.id ===
                                                  participant.id
                                              }
                                              setPinnedUser={setPinnedUser}
                                              className="w-[calc(50%-3px)]"
                                          />
                                      ))
                                : null}
                        </div>
                    </div>
                ) : null}

                {/* Grid layout */}
                {pinnedUser === null && !deviceType ? (
                    <div
                        className={`grid grid-flow-row gap-4 h-full items-center justify-items-center p-5 min-h-0 min-w-0 overflow-hidden
                     ${
                         subcribers.length === 0
                             ? "grid-cols-1"
                             : subcribers.length > 0 && subcribers.length <= 3
                             ? "grid-cols-2"
                             : subcribers.length > 3 && subcribers.length <= 8
                             ? "grid-cols-3"
                             : subcribers.length > 8 && subcribers.length <= 15
                             ? "grid-cols-4"
                             : subcribers.length > 15
                             ? "grid-cols-5"
                             : ""
                     }`}
                    >
                        <UserVideo
                            participant={publisher}
                            publisher
                            className={`h-full w-full min-w-0 min-h-0 rounded-lg ${
                                subcribers.length > 0 && subcribers.length <= 3
                                    ? "flex items-center"
                                    : ""
                            }`}
                            setPinnedUser={setPinnedUser}
                            setParticipant={setParticipant}
                            isPublisher
                        />
                        {subcribers.length !== 0
                            ? subcribers.map((subcriber) => (
                                  <UserVideo
                                      key={subcriber.id}
                                      participant={subcriber}
                                      className={`h-full w-full min-w-0 min-h-0 rounded-lg ${
                                          subcribers.length > 0 &&
                                          subcribers.length <= 3
                                              ? "flex items-center"
                                              : ""
                                      }`}
                                      setPinnedUser={setPinnedUser}
                                      setParticipant={setParticipant}
                                  />
                              ))
                            : null}
                    </div>
                ) : null}

                {/* Mobile Grid Layout */}
                {deviceType?.toUpperCase() === "MOBILE" &&
                pinnedUser === null ? (
                    <div className="flex flex-col h-full min-h-0 min-w-0">
                        <div
                            className={`flex overflow-x-auto 
                     ${subcribers.length > 3 ? "h-[50%]" : ""}
                  `}
                        >
                            {subcribers.slice(2).map((sub) => (
                                <UserVideo
                                    key={sub.id}
                                    setParticipant={setParticipant}
                                    participant={sub}
                                    className={`h-full min-w-0 min-h-0 rounded-lg flex-shrink-0`}
                                    setPinnedUser={setPinnedUser}
                                />
                            ))}
                        </div>
                        {subcribers.slice(0, 2).map((sub) => (
                            <UserVideo
                                key={sub.id}
                                className={`h-full w-full min-w-0 min-h-0 rounded-lg ${
                                    subcribers.length > 0 &&
                                    subcribers.length <= 3
                                        ? "flex items-center"
                                        : ""
                                }`}
                                setParticipant={setParticipant}
                                participant={sub}
                                setPinnedUser={setPinnedUser}
                            />
                        ))}
                        <UserVideo
                            setParticipant={setParticipant}
                            participant={publisher}
                            isPublisher
                            className={`h-full w-full min-w-0 min-h-0 rounded-lg ${
                                subcribers.length > 0 && subcribers.length <= 3
                                    ? "flex items-center"
                                    : ""
                            }`}
                            setPinnedUser={setPinnedUser}
                        />
                    </div>
                ) : null}

                {/* Mobile Pinned Layout */}
                {deviceType?.toUpperCase() === "MOBILE" &&
                pinnedUser !== null ? (
                    <div className="flex flex-col h-full min-h-0 min-w-0">
                        {/* Sub section */}
                        <div
                            className={`flex overflow-x-auto 
                     ${subcribers.length > 3 ? "h-[50%]" : ""}
                  `}
                        >
                            {participants
                                .filter(
                                    (participant) => participant !== pinnedUser
                                )
                                .map((participant) => (
                                    <UserVideo
                                        key={participant.id}
                                        setParticipant={setParticipant}
                                        participant={participant}
                                        className={`h-full min-w-0 min-h-0 rounded-lg flex-shrink-0`}
                                        setPinnedUser={setPinnedUser}
                                    />
                                ))}
                        </div>

                        {/* pin section */}
                        <div className="w-full h-full">
                            <UserVideo
                                key={pinnedUser.id}
                                setParticipant={setParticipant}
                                participant={pinnedUser}
                                className={`h-full min-w-0 min-h-0 rounded-lg flex-shrink-0`}
                                setPinnedUser={setPinnedUser}
                            />
                        </div>
                    </div>
                ) : null}

                {/* toolbar */}
                <div
                    className={`flex justify-center items-center rounded py-2 ${
                        deviceType?.toUpperCase() === "MOBILE"
                            ? "gap-20"
                            : "gap-5"
                    }`}
                >
                    {/* Logout */}
                    <button
                        className={`border border-gray-300 rounded-lg p-2 bg-red-500`}
                        onClick={(e) => {
                            leaveSession();
                            navigate("..", { relative: "path" });
                        }}
                    >
                        <LogOut
                            className={`stroke-white stroke-[3] ${
                                deviceType?.toUpperCase() === "MOBILE"
                                    ? "w-16 h-16"
                                    : ""
                            }`}
                        />
                    </button>

                    {/* Mic */}
                    <button
                        className={`border border-gray-300 rounded-lg p-2 ${
                            isMicEnable ? "bg-green-600" : "bg-gray-400"
                        }`}
                        onClick={(e) => {
                            setIsMicEnable(!isMicEnable);
                            publisher.streamManager.publishAudio(!isMicEnable);
                            publisher.isAudio = !isMicEnable;
                            setPublisher({ ...publisher });
                        }}
                    >
                        {isMicEnable ? (
                            <Mic
                                className={`stroke-white stroke-[2] ${
                                    deviceType?.toUpperCase() === "MOBILE"
                                        ? "w-16 h-16"
                                        : ""
                                }`}
                            />
                        ) : (
                            <MicOff
                                className={`stroke-black stroke-[2] ${
                                    deviceType?.toUpperCase() === "MOBILE"
                                        ? "w-16 h-16"
                                        : ""
                                }`}
                            />
                        )}
                    </button>

                    {/* Camera */}
                    <button
                        className={`border border-gray-300 rounded-lg p-2 ${
                            isCamEnable ? "bg-green-600" : "bg-gray-400"
                        }`}
                        onClick={(e) => {
                            if (isShareScreen) return;
                            setIsCamEnable(!isCamEnable);
                            publisher.isVideo = !isCamEnable || isShareScreen;
                            setPublisher({ ...publisher });
                            publisher.streamManager.publishVideo(!isCamEnable);
                        }}
                    >
                        {isCamEnable ? (
                            <Camera
                                className={`stroke-white stroke-[2] ${
                                    deviceType?.toUpperCase() === "MOBILE"
                                        ? "w-16 h-16"
                                        : ""
                                }`}
                            />
                        ) : (
                            <CameraOff
                                className={`stroke-black stroke-[2] ${
                                    deviceType?.toUpperCase() === "MOBILE"
                                        ? "w-16 h-16"
                                        : ""
                                }`}
                            />
                        )}
                    </button>

                    {/* Share screen */}
                    <button
                        className={`border border-gray-300 rounded-lg p-2 ${
                            isShareScreen ? "bg-green-600" : "bg-gray-400"
                        }`}
                        onClick={async (e) => {
                            if (isCamEnable) return;
                            await shareScreen(!isShareScreen);
                            setIsCamEnable(false);
                            setIsShareScreen(!isShareScreen);
                            publisher.isVideo = isCamEnable || !isShareScreen;
                            setPublisher({ ...publisher });
                            publisher.streamManager.publishVideo(
                                !isShareScreen
                            );
                        }}
                    >
                        {isShareScreen ? (
                            <MonitorPlay
                                className={`stroke-white stroke-[2] ${
                                    deviceType?.toUpperCase() === "MOBILE"
                                        ? "w-16 h-16"
                                        : ""
                                }`}
                            />
                        ) : (
                            <MonitorPlay
                                className={`stroke-black stroke-[2] ${
                                    deviceType?.toUpperCase() === "MOBILE"
                                        ? "w-16 h-16"
                                        : ""
                                }`}
                            />
                        )}
                    </button>
                </div>
            </div>
            {/* <ReplySection /> */}
        </div>
    );
}
export { VideoSection };
