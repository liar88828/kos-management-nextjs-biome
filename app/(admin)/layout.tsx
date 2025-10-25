import type React from "react";
import ProtectedLayout from "@/components/provider/protect-provider-layout";


function Layout({ children }: { children: React.ReactNode }) {
    return <ProtectedLayout isRole={ "ADMIN" }>{ children }</ProtectedLayout>;
}


export default Layout;
