"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean); // remove empty parts

    // Build breadcrumb data
    const breadcrumbs = segments.map((seg, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return { href, label: seg.charAt(0).toUpperCase() + seg.slice(1) };
    });

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
                <SidebarTrigger/>
                <Separator className="mr-2 h-4" orientation="vertical"/>

                <Breadcrumb>
                    <BreadcrumbList>
                        {/* Home link */ }
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        { breadcrumbs.map((bc, index) => (
                            <div className="flex items-center" key={ bc.href }>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    { index === breadcrumbs.length - 1 ? (
                                        <BreadcrumbPage>
                                            { bc.label }
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={ bc.href as Route }>
                                                { bc.label }
                                            </Link>
                                        </BreadcrumbLink>
                                    ) }
                                </BreadcrumbItem>
                            </div>
                        )) }
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
