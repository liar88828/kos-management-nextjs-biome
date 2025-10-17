"use client";
import {
    BarChart,
    Bed,
    CreditCard,
    GalleryVerticalEnd,
    Home,
    House,
    MapPinHouse,
    Receipt,
    Users,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import type * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";


type NavData = {
    title: string;
    url: Route;
    icon: React.ElementType;
    items: {
        title: string;
        url: Route;
        icon?: React.ElementType;
    }[];
};

const navData: NavData[] = [
    // biome-ignore assist/source/useSortedKeys: <explanation>
    {
        icon: Home,
        title: "Main Menu",
        url: "/",
        items: [
            {
                icon: MapPinHouse,
                title: "Location",
                url: "/locations",
            },
            {
                icon: Bed,
                title: "Kamar",
                url: "/rooms",
            },
            {
                icon: CreditCard,
                title: "Pembayaran",
                url: "/payments",
            },
            {
                icon: Users,
                title: "Penyewa",
                url: "/tenants",
            },

            {
                icon: Receipt,
                title: "Biaya",
                url: "/expenses",
            },
            {
                icon: BarChart,
                title: "Laporan",
                url: "/reports",
            },
        ],
    },
];


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <Sidebar { ...props }>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link href="#">
                                <div
                                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4"/>
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">
                                        Documentation
                                    </span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        { navData.map((item) => {
                            const Icon = item.icon;
                            return (
                                <SidebarMenuItem key={ item.title }>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            className="flex items-center gap-2 font-medium"
                                            href={ item.url }
                                        >
                                            <Icon className="h-4 w-4"/>
                                            { item.title }
                                        </Link>
                                    </SidebarMenuButton>

                                    { item.items?.length ? (
                                        <SidebarMenuSub>
                                            { item.items.map((sub) => {
                                                const SubIcon = sub.icon;
                                                return (
                                                    <SidebarMenuSubItem
                                                        key={ sub.title }
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={ pathname.includes(
                                                                sub.url,
                                                            ) }
                                                        >
                                                            <Link
                                                                className="flex items-center gap-2 text-nowrap"
                                                                href={ sub.url }
                                                            >
                                                                { SubIcon && (
                                                                    <SubIcon className="h-4 w-4"/>
                                                                ) }
                                                                { sub.title }
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            }) }
                                        </SidebarMenuSub>
                                    ) : null }
                                </SidebarMenuItem>
                            );
                        }) }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail/>
        </Sidebar>
    );
}
