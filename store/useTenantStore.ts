import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TenantType } from "@/app/tenants/tenant-schema";

type TenantStore = {
    tenants: TenantType[];
    query: string;
    // filtered: Tenant[];
    setTenants: (tenants: TenantType[]) => void;
    setQuery: (query: string) => void;
    addTenant: (tenant: TenantType) => void;
    updateTenant: (tenant: TenantType) => void;
    deleteTenant: (id: string) => void;
    getTenantById: (id: string) => TenantType | undefined;
};

export const useTenantStore = create<TenantStore>()(
    persist(
        (set, get) => ({
            addTenant: (tenant) => {
                set((state) => ({
                    tenants: [{ ...tenant, id: nanoid() }, ...state.tenants],
                }));
            },

            getTenantById: (id) => {
                return get().tenants.find((item) => item.id === id);
            },
            deleteTenant: (id) => {
                set((state) => ({
                    tenants: state.tenants.filter((r) => r.id !== id),
                }));
            },
            query: "",
            tenants: [],
            // get filtered() {
            //     const q = get().query.toLowerCase();
            //     return get().tenants.filter(
            //         (r) =>
            //             r.nomor.toLowerCase().includes(q) ||
            //             r.status.toLowerCase().includes(q) ||
            //             r.fasilitas.join(", ").toLowerCase().includes(q) ||
            //             r.hargaBulanan.toString().includes(q) ||
            //             (r.hargaTahunan?.toString().includes(q) ?? false),
            //     );
            // },

            setQuery: (query) => set({ query }),
            setTenants: (tenants) => set({ tenants: tenants }),
            updateTenant: (tenant) => {
                set((state) => ({
                    tenants: state.tenants.map((r) =>
                        r.id === tenant.id ? tenant : r,
                    ),
                }));
            },
        }),
        {
            name: "tenant-storage", // key untuk localStorage
            partialize: (state) => ({
                query: state.query,
                tenants: state.tenants,
            }),
        },
    ),
);
