import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

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
          <Label className="text-md text-muted-foreground">username</Label>
        </div>
        <Suspense fallback={<p className="text-lg font-medium"> Username </p>}>
          <Await resolve={data.user}>
            {(user) => (
              <p className="text-lg font-medium"> {user.username} </p>
            )}
          </Await>
        </Suspense>
      </div>
      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-md text-muted-foreground"> Email </Label>
        </div>
        <p className="text-lg font-medium"> PutinLord@gmail.com </p>
      </div>
      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-md text-muted-foreground"> Password </Label>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-black"
          >
            Edit
          </Button>
        </div>
        <p className="text-lg font-medium"> *********** </p>
      </div>
      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-md text-muted-foreground"> Profile </Label>
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
