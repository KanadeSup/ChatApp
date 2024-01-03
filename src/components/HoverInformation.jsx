import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getShortDate } from "../utils/getShortDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, MessageCircle, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import ProfileDialog from "./ProfileDiaglog";
import { getUserById } from "../api";
import { useEffect, useState } from "react";
export default function HoverInformation({ name, avatar, children, idUser }) {
    const navigate = useNavigate();
    const { workspaceId } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function fetchUser() {
            const response = await getUserById(idUser);
            setUser(response);
        }
        fetchUser();
    }, [idUser]);
    return (
        <HoverCard>
            <HoverCardTrigger>
                {/* <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.picture} alt="@shadcn" />
                    <AvatarFallback className="bg-gray-300 p-1">
                        <User2 />
                    </AvatarFallback>
                </Avatar>
                <div className="flex ml-1 items-center justify-between">
                    <p className="font-bold text-md">
                        {user?.firstName} {user?.lastName}
                    </p>
                </div> */}
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-3 w-[300px] items-center">
                <Avatar className="h-16 mt-3 w-16">
                    <AvatarImage src={avatar} alt="@shadcn" />
                    <AvatarFallback className="bg-gray-300 p-1">
                        <User2 />
                    </AvatarFallback>
                </Avatar>
                <span className="text-[17px] font-bold">{name}</span>
                <div className="w-full border border-slate-400"></div>
                {/* <div className="grid w-full gap-1">
                    <div className="flex items-center justify-start space-x-2 text-sm">
                        <span className="w-14">Email:</span>
                        <span className="underline">{user?.email}</span>
                    </div>
                    <div className="flex items-center justify-start space-x-2 text-sm">
                        <span className="w-14">Phone:</span>
                        <span>{user?.phone}</span>
                    </div>
                    <div className="flex items-center justify-start space-x-2 text-sm">
                        <span className="w-14">Gender:</span>
                        <span>{user?.gender ? "Male" : "female"}</span>
                    </div>
                    <div className="flex items-center justify-start space-x-2 text-sm">
                        <span className="w-14">BirthDay:</span>
                        <span>{getShortDate(user?.birthDay)}</span>
                    </div>
                </div> */}
                <div className="flex gap-2 select-none">
                    <Button
                        variant="outline"
                        className="w-full border-slate-400"
                        onClick={() =>
                            workspaceId
                                ? navigate(
                                      `/${workspaceId}/colleague-chat/${idUser}`
                                  )
                                : navigate(`/colleague-chat/${idUser}`)
                        }
                    >
                        <MessageCircle className="scale-x-[-1] w-5 h-5" />{" "}
                        <span className="ml-2">Message</span>
                    </Button>
                    <ProfileDialog member={user}>
                        <Button
                            variant="outline"
                            className="w-full border-slate-400"
                        >
                            <Info className="scale-x-[-1] w-5 h-5" />
                            <span className="ml-2">View profile </span>
                        </Button>
                    </ProfileDialog>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
