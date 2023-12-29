import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react"

function CreateMeetingDialog({ children }) {
    const [open, setOpen] = useState()
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                
            </DialogContent>
        </Dialog>
    )
}
export { CreateMeetingDialog }