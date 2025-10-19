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
    children: ReactNode;
    text: string;
    className?: string;
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
    onClick?: () => void;
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
};


export function ButtonToolTip({
                                  onClick,
                                  children,
                                  text,
                                  className,
                                  variant = "default",
                                  size = "default",
                                  asChild = false,
                              }: ButtonToolTipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    asChild={ asChild }
                    className={ className }
                    onClick={ onClick }
                    size={ size }
                    variant={ variant }
                >
                    { children }
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{ text }</p>
            </TooltipContent>
        </Tooltip>
    );
}
