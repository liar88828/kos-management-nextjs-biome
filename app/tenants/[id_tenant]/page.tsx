import { exampleTenant } from "@/app/tenants/tenant-example";
import { TenantDetail } from "@/app/tenants/tenantDetail";

export default function Page() {
    return <TenantDetail tenant={ exampleTenant }/>;
}
