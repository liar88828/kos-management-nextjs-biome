"use client";
import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";


export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
            <SidebarProvider>
                <AppSidebar/>
                <SidebarInset>
                    <AppHeader/>
                    <main className="min-h-screen space-y-4 bg-gradient-to-br from-background to-foreground/15 p-4 sm:space-y-6 sm:p-6">{ children }</main>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
