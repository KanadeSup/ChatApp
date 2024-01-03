import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ChangePassword from "./ChangePassword";

export default function () {
    const data = useLoaderData();
    return (
        <div className="space-y-4 w-[600px]">
            <div>
                <h1 className="text-lg font-medium"> Account </h1>
                <p className="text-muted-foreground text-sm">
                    Update your account settings
                </p>
            </div>
            <Separator />
            <div>
                <div className="flex items-center justify-between">
                    <Label className="text-md text-muted-foreground">
                        username
                    </Label>
                </div>
                <Suspense fallback={<Skeleton className="w-full h-7" />}>
                    <Await resolve={data.user}>
                        {(user) => (
                            <p className="text-lg font-medium">
                                {" "}
                                {user.username}{" "}
                            </p>
                        )}
                    </Await>
                </Suspense>
            </div>
            <Separator />

            <div>
                <div className="flex items-center justify-between">
                    <Label className="text-md text-muted-foreground">
                        {" "}
                        Email{" "}
                    </Label>
                </div>
                <Suspense fallback={<Skeleton className="w-full h-7" />}>
                    <Await resolve={data.user}>
                        {(user) => (
                            <p className="text-lg font-medium">
                                {" "}
                                {user.email}{" "}
                            </p>
                        )}
                    </Await>
                </Suspense>
            </div>
            <Separator />

            <div>
                <div className="flex items-center justify-between">
                    <Label className="text-md text-muted-foreground">
                        {" "}
                        Password{" "}
                    </Label>
                    <ChangePassword>
                        <Button
                            variant="link"
                            className="text-muted-foreground hover:text-black"
                        >Change</Button>
                    </ChangePassword>
                </div>
                <p className="text-lg font-medium"> *********** </p>
            </div>
            <Separator />

            <div>
                <div className="flex items-center justify-between">
                    <Label className="text-md text-muted-foreground">
                        {" "}
                        Profile{" "}
                    </Label>
                    <Link to="Profile">
                        <Button
                            variant="link"
                            className="text-muted-foreground hover:text-black"
                        >
                            {" "}
                            Edit{" "}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
