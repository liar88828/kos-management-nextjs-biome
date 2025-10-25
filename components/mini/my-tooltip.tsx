"use client";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";


interface MyToolTipProps {
    children: ReactNode;
    text: string;
}


export function MyToolTip({ children, text }: MyToolTipProps) {
    return (
        <Tooltip>
            <TooltipTrigger>{ children }</TooltipTrigger>
            <TooltipContent>
                <p>{ text }</p>
            </TooltipContent>
        </Tooltip>
    );
}


type ButtonToolTipProps = {
    asChild?: boolean;
    children: ReactNode;
    className?: string;
    onClickAction?: () => void;
    size?: "default" | "sm" | "lg" | "icon";
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};


export function ButtonToolTip({ onClickAction, children, text, className, variant = "default", size = "default", asChild = false }: ButtonToolTipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button asChild={ asChild } className={ className } onClick={ onClickAction } size={ size } variant={ variant }>
                    { children }
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{ text }</p>
            </TooltipContent>
        </Tooltip>
    );
}
