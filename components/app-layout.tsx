import type { ReactNode } from "react";
import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <AppHeader/>
                <main className="min-h-screen space-y-6 bg-background p-6 text-foreground">
                    { children }
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
