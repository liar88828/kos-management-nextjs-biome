"use client";

import { useAuthStore, type UserRole } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";


export default function ProtectedLayout({
                                            children,
                                            isRole,
                                        }: {
    isRole: UserRole;
    children: ReactNode;
}) {
    const router = useRouter();
    const { user } = useAuthStore();
    const [ status, setStatus ] = useState<"checking" | "authorized" | "unauthorized">(
        "checking"
    );

    useEffect(() => {
        if (!user) {
            router.replace("/auth/login");
            setStatus("unauthorized");
            return;
        }

        // Role validation
        if (isRole === "ADMIN" && user.role !== "ADMIN") {
            router.replace("/auth/login");
            setStatus("unauthorized");
            return;
        }

        if (isRole === "USER" && user.role !== "USER") {
            router.replace("/auth/login");
            setStatus("unauthorized");
            return;
        }

        setStatus("authorized");
    }, [ user, isRole, router ]);

    if (status === "checking") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
            </div>
        );
    }

    if (status === "unauthorized") return null;

    return <>{ children }</>;
}
