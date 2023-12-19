import { Button } from "@/components/ui/button";
import { Plus, ImagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Form } from "react-router-dom";

export default function () {
   const [logo, setLogo] = useState(null);
   const [wname, setWName] = useState("My workspace");
   return (
      <Dialog
         onOpenChange={(e) => {
            setLogo(null);
            setWName("My workspace");
         }}
      >
         <DialogTrigger asChild>
            <Button>
               <Plus className="w-[20px] h-[20px] fill-white mr-2" strokeWidth={3} />
               <span className="font-medium"> Create </span>
            </Button>
         </DialogTrigger>
         <DialogContent>
            <Form method="POST" encType="multipart/form-data">
               <DialogHeader>
                  <DialogTitle className="text-xl"> Create Workspace </DialogTitle>
                  <DialogDescription>Give your new workspace a personality with a name and an icon. You can change it later</DialogDescription>
               </DialogHeader>
               <div className="flex justify-center">
                  <label htmlFor="upload" className="cursor-pointer">
                     {(logo && <img className="border border-gray-200 w-20 h-20 rounded-lg" src={URL.createObjectURL(logo)} />) || (
                        <div className="border-2 border-dashed border-gray-400 rounded-lg w-20 h-20 flex flex-col items-center justify-center hover:bg-gray-100">
                           <ImagePlus strokeWidth={2} className="stroke-gray-300 w-8 h-8" />
                        </div>
                     )}
                  </label>
                  <input
                     type="file"
                     className="hidden"
                     id="upload"
                     name="Avatar"
                     onChange={(e) => {
                        if (e.target.files[0] && e.target.files[0].type.split("/")[0] === "image") {
                           const imgFile = e.target.files[0];
                           const reader = new FileReader();
                           reader.onload = function (e) {
                              const img = document.createElement("img");
                              img.onload = function (e) {
                                 const canvas = document.createElement("canvas");
                                 const ctx = canvas.getContext("2d");
                                 canvas.width = 100;
                                 canvas.height = 100;
                                 ctx.drawImage(img, 0, 0, 100, 100);
                                 canvas.toBlob((blob) => {
                                    const file = new File([blob], "avatar");
                                    setLogo(file)
                                 });
                              };
                              img.src = e.target.result;
                           };
                           reader.readAsDataURL(imgFile);
                        }
                     }}
                  />
               </div>
               <div>
                  <Label htmlFor="wname" className="">
                     {" "}
                     Workspace Name{" "}
                  </Label>
                  <Input
                     id="wname"
                     name="name"
                     className="border-gray-500 outline-none"
                     defaultValue={wname}
                     maxLength={30}
                     onChange={(e) => {
                        setWName(e.target.value);
                     }}
                  />
               </div>
               <DialogFooter className="mt-4">
                  <DialogClose asChild>
                     <Button type="button" variant="secondary">
                        {" "}
                        Cancel{" "}
                     </Button>
                  </DialogClose>
                  <DialogClose asChild>
                     <Button type="submit" disabled={wname.trim().length < 6}>
                        Create
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
