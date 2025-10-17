import { TooltipTrigger, Tooltip, TooltipContent } from "../ui/tooltip";

interface MyToolTipProps {
    children: React.ReactNode;
    text: string;
}

export default function MyToolTip({ children, text }: MyToolTipProps) {
    return (
        <Tooltip>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    );
}
