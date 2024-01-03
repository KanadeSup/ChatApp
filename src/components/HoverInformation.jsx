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
import { set } from "date-fns";
export default function HoverInformation({ name, avatar, children, idUser }) {
    const navigate = useNavigate();
    const { workspaceId } = useParams();
    const [user, setUser] = useState([]);
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        async function fetchUser() {
            const response = await getUserById(idUser);
            setUser(response);
        }
        if (isShow) {
            fetchUser();
            setIsShow(false);
        }
    }, [idUser, isShow]);
    return (
        <HoverCard>
            <HoverCardTrigger>{children}</HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-3 w-[300px] items-center">
                <Avatar className="h-16 mt-3 w-16">
                    <AvatarImage src={avatar} alt="@shadcn" />
                    <AvatarFallback className="bg-gray-300 p-1">
                        <User2 />
                    </AvatarFallback>
                </Avatar>
                <span className="text-[17px] font-bold">{name}</span>
                <div className="w-full border border-slate-400"></div>
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
                    <div onClick={() => setIsShow(true)}>
                        <ProfileDialog
                            member={user}
                            
                        >
                            <Button
                                variant="outline"
                                className="w-full border-slate-400"
                            >
                                <Info className="scale-x-[-1] w-5 h-5" />
                                <span className="ml-2">View profile </span>
                            </Button>
                        </ProfileDialog>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
