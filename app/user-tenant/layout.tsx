import ProtectedLayout from "@/components/provider/protect-provider-layout";
import type React from "react";


function Layout({ children }: { children: React.ReactNode }) {
    return <ProtectedLayout isRole={ 'USER' }>{ children }</ProtectedLayout>;
}


export default Layout;
