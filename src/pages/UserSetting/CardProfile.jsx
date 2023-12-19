import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfile from "./EditCardProfile";
import { useState, useEffect, Suspense } from "react";
import { getUserById } from "../../api";
import { User2 } from "lucide-react";
import { is } from "date-fns/locale";

export default function () {
  const [user, setUser] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(localStorage.getItem("userId"));
      setUser(data);
      console.log("data", data);
    };
    fetchUser();
  }, [isUpdate]);

  if (user === null) {
    return (
      <div className="flex flex-col p-6 w-[600px] border space-y-6 rounded-md">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-20 w-20 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="grid grid-cols-[80px_50px_auto] grid-flow-row items-center gap-y-3">
          <Label> Full name </Label>
          <span> : </span>
          <Skeleton className="h-5 w-[200px]" />

          <Label> Gender </Label>
          <span> : </span>
          <Skeleton className="h-5 w-[100px]" />

          <Label> Phone </Label>
          <span> : </span>
          <Skeleton className="h-5 w-[250px]" />

          <Label> Birthday </Label>
          <span> : </span>
          <Skeleton className="h-5 w-[250px]" />
        </div>
      </div>
    );
  }

  return (
    <Card className="relative shadow">
      <CardHeader>
        <div className="flex items-center gap-5">
          <Avatar className="rounded-lg h-20 w-20">
            <AvatarImage src={user.picture} />
            <AvatarFallback className="rounded-lg text-3xl"> 
              <User2 className="w-10 h-10"/>
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-medium">
              {user.lastName} {user.firstName}
            </h1>
            <h2 className="italic text-md text-muted-foreground">
              {user.email}
            </h2>
          </div>
          <EditProfile user={user} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-[80px_50px_auto] grid-flow-row items-center gap-y-3">
        <Label> Full name </Label>
        <span> : </span>
        <p>
          {user.lastName} {user.firstName}
        </p>

        <Label> Gender </Label>
        <span> : </span>
        <p> {user.gender ? "Male" : "Female"} </p>

        <Label> Phone </Label>
        <span> : </span>
        <p> {user.phone} </p>

        <Label> Birthday </Label>
        <span> : </span>
        <p> {user.birthDay} </p>
      </CardContent>
    </Card>
  );
}
