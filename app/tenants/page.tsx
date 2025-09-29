import { exampleTenant } from "@/app/tenants/tenant-example";
import { TenantsPage } from "@/app/tenants/tenantsPage";

export default function Page() {
    return <TenantsPage tenants={ [ exampleTenant ] }/>;
}
