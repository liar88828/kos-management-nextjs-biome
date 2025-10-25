import { TenantDetail } from "../tenant-detail";


export default async function Page(page: PageProps<"/tenants/[id_tenant]">) {
    const idTenant = (await page.params).id_tenant;
    return (
        <TenantDetail
            idTenant={ idTenant }
            // tenant={exampleTenant}
        />
    );
}
