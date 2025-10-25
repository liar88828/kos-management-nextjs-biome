"use client";
import { ButtonToolTip } from "@/components/mini/my-tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Trash } from "lucide-react";


export function LocationDelete({
                                   onDeleteAction,
                               }: {
    onDeleteAction: () => void;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonToolTip size="sm" text="Delete" variant="destructive">
                    <Trash/>
                </ButtonToolTip>
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
