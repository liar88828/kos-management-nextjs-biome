import { Trash } from "lucide-react";
import React from "react";
import MyToolTip from "@/components/mini/my-tooltip";
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


export function LocationDelete({
                                   onDeleteAction,
                               }: {
    onDeleteAction: () => void;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <MyToolTip text="Delete">
                    <Button size="sm" variant="destructive">
                        <Trash/>
                    </Button>
                </MyToolTip>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        remove it from your records.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={ onDeleteAction } variant="destructive">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
