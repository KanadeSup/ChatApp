import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import changePassowrd from "../../api/auth/changePassword";
import getOTP from "../../api/auth/getOTP";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

export default function () {
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [OTP, setOTP] = useState();
    const [error, setError] = useState();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    async function handleChangePassword() {
        const res = await changePassowrd(currentPassword, newPassword, OTP);
        console.log(res);
        if (!res.ok) {
            setError(res.data.title);
            return;
        }
        toast({
            title: <p className="text-green-700 flex gap-2"><Check/> Change password successfully</p>,
        });
        setOpen(false);
    }
    async function handleGetOTP() {
        const res = await getOTP(2, localStorage.getItem("email"));
        console.log(res);
        if (!res.ok) {
            setError(res.title);
            return;
        }
        toast({
            title: <p className="text-green-700 flex gap-2"><Check/> Get OTP successfully</p>,
        });
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Change</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Make changes to your password here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="currentPassword" className="text-right">
                            Current Password
                        </Label>
                        <Input
                            type="password"
                            id="currentPassword"
                            className="col-span-2"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="newPassword" className="text-right">
                            New Password
                        </Label>
                        <Input
                            id="newPassword"
                            type="password"
                            className="col-span-2"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="OTP" className="text-right">
                            OTP
                        </Label>
                        <div className="relative col-span-2">
                            <Input
                                id="OTP"
                                className="w-full"
                                onChange={(e) => setOTP(e.target.value)}
                            />
                            <Button
                                variant="link"
                                className="absolute top-0 right-0 text-xs"
                                onClick={handleGetOTP}
                            >
                                Get OTP
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <div className="col-span-2"></div>
                    </div>
                </div>
                <div className="text-red-500 font-medium text-sm h-6">
                    {error}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleChangePassword}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
