import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogFooter,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Pencil, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getUserById, updateUser } from "/api";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import updateUserAvatar from "../../api/user/updateUserAvatar";
import useInfo from "../../storages/useInfo";

export default function ({ user, isUpdate, setIsUpdate, setUser }) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();
    const [birthDay, setBirthDay] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState();
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setGender(user.gender);
        setPhone(user.phone);
        setBirthDay(user.birthDay);
        setEmail(user.email);
        setAvatar(user.picture);
    }, []);

    async function handleSave() {
        setIsLoading(true);
        await updateUser(
            user.id,
            firstName,
            lastName,
            gender,
            phone,
            email,
            birthDay
        );
        if (file) await updateUserAvatar(user.id, file);
        setIsLoading(false);
        navigate("/UserSetting/Profile");
        setIsUpdate(!isUpdate);
        const modifiedUser = { ...user };
        modifiedUser.firstName = firstName;
        modifiedUser.lastName = lastName;
        modifiedUser.gender = gender;
        modifiedUser.phone = phone;
        modifiedUser.email = email;
        modifiedUser.birthDay = birthDay;
        modifiedUser.picture = avatar;
        setUser(modifiedUser);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="ml-auto self-start w-7 h-7 absolute top-2 right-2"
                >
                    <Pencil className="stroke-gray-500 w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-5">
                        <Label className="cursor-pointer">
                            <Avatar className="rounded-lg h-20 w-20">
                                <AvatarImage
                                    src={avatar}
                                    className="h-20 w-20"
                                />
                                <AvatarFallback className="rounded-lg text-3xl">
                                    <User2 className="w-10 h-10" />
                                </AvatarFallback>
                            </Avatar>
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    if (
                                        e.target.files[0] &&
                                        e.target.files[0].type.split("/")[0] ===
                                            "image"
                                    ) {
                                        const imgFile = e.target.files[0];
                                        const reader = new FileReader();
                                        reader.onload = function (e) {
                                            const img =
                                                document.createElement("img");
                                            img.onload = function (e) {
                                                const canvas =
                                                    document.createElement(
                                                        "canvas"
                                                    );
                                                const ctx =
                                                    canvas.getContext("2d");
                                                canvas.width = 100;
                                                canvas.height = 100;
                                                ctx.drawImage(
                                                    img,
                                                    0,
                                                    0,
                                                    100,
                                                    100
                                                );
                                                setAvatar(
                                                    canvas.toDataURL(
                                                        imgFile.type
                                                    )
                                                );
                                                canvas.toBlob((blob) => {
                                                    const file = new File(
                                                        [blob],
                                                        "avatar"
                                                    );
                                                    setFile(file);
                                                });
                                            };
                                            img.src = e.target.result;
                                        };
                                        reader.readAsDataURL(imgFile);
                                        // setAvatar(URL.createObjectURL(e.target.files[0]));
                                        // setFile(e.target.files[0])
                                    }
                                }}
                            />
                        </Label>
                        <div>
                            <h1 className="text-xl font-medium">
                                {" "}
                                {lastName} {firstName}{" "}
                            </h1>
                            <h2 className="italic text-md text-muted-foreground">
                                {" "}
                                {user.email}{" "}
                            </h2>
                        </div>
                    </div>
                </DialogHeader>
                <div className="grid grid-cols-[80px_50px_auto] grid-flow-row items-center gap-y-3">
                    <Label> First name </Label>
                    <span> : </span>
                    <Input
                        defaultValue={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <Label> Last name </Label>
                    <span> : </span>
                    <Input
                        defaultValue={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <Label> Gender </Label>
                    <span> : </span>
                    <RadioGroup
                        defaultValue={gender ? true : false}
                        onValueChange={setGender}
                        className="flex items-center gap-10"
                    >
                        <div className="flex items-center gap-1">
                            <RadioGroupItem value={true} id="male" />
                            <Label htmlFor="male"> Male </Label>
                        </div>
                        <div className="flex items-center gap-1">
                            <RadioGroupItem value={false} id="female" />
                            <Label htmlFor="female"> Female </Label>
                        </div>
                    </RadioGroup>

                    <Label> Phone </Label>
                    <span> : </span>
                    <Input
                        value={phone}
                        onChange={(e) => {
                            const value = e.target.value;
                            const isNumber = /^[0-9\b]+$/.test(value);
                            if (
                                value.length === 0 ||
                                (value.length <= 10 &&
                                    value[0] === "0" &&
                                    isNumber)
                            ) {
                              console.log("value", value);
                                setPhone(value);
                            }
                        }}
                    />

                    <Label> Birthday </Label>
                    <span> : </span>
                    <Input
                        type="date"
                        placeholder="dd-mm-yyyy"
                        onChange={(e) => setBirthDay(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary"> Cancel </Button>
                    </DialogClose>
                    {isLoading ? (
                        <Button disabled className="w-20">
                            <Loader2 className="animate-spin" />
                        </Button>
                    ) : (
                        <Button className="w-20" onClick={handleSave}>
                            {" "}
                            Save{" "}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
