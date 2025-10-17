'use client'
import { Badge } from "lucide-react";
import type React from "react";
import { NotFoundPage } from "@/components/mini/notFoundPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenantStore } from "@/store/useTenantStore";

export const TenantDetail: React.FC<{
    // tenant: Tenant;
    idTenant: string;
}> = ({ idTenant }) => {
    const tenant = useTenantStore((state) => state.getTenantById)(idTenant);

    if (!tenant) return <NotFoundPage />;
    return (
        <div className="space-y-6">
            {/* Basic Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <span className="font-medium">Nama:</span> {tenant.nama}
                    </div>
                    {tenant.email && (
                        <div>
                            <span className="font-medium">Email:</span>{" "}
                            {tenant.email}
                        </div>
                    )}
                    <div>
                        <span className="font-medium">Kontak:</span>{" "}
                        {tenant.kontak}
                    </div>
                    {tenant.pekerjaan && (
                        <div>
                            <span className="font-medium">Pekerjaan:</span>{" "}
                            {tenant.pekerjaan}
                        </div>
                    )}
                    {tenant.ktp && (
                        <div>
                            <span className="font-medium">KTP:</span>{" "}
                            {tenant.ktp}
                        </div>
                    )}
                    {tenant.jenisKelamin && (
                        <div>
                            <span className="font-medium">Jenis Kelamin:</span>{" "}
                            {tenant.jenisKelamin}
                        </div>
                    )}
                    {tenant.tanggalLahir && (
                        <div>
                            <span className="font-medium">Tanggal Lahir:</span>{" "}
                            {tenant.tanggalLahir}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Room Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Kamar & Waktu Tinggal</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <span className="font-medium">Kamar:</span>{" "}
                        {tenant.kamar}
                    </div>
                    <div>
                        <span className="font-medium">Masuk:</span>{" "}
                        {tenant.masuk}
                    </div>
                    {tenant.keluar && (
                        <div>
                            <span className="font-medium">Keluar:</span>{" "}
                            {tenant.keluar}
                        </div>
                    )}
                    {tenant.deposit !== undefined && (
                        <div>
                            <span className="font-medium">Deposit:</span> Rp{" "}
                            {tenant.deposit.toLocaleString()}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Payment & Notes */}
            <Card>
                <CardHeader>
                    <CardTitle>Pembayaran & Catatan</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Status Pembayaran:</span>
                        <Badge
                            //@ts-expect-error
                            variant={
                                tenant.statusPembayaran === "lunas"
                                    ? "default"
                                    : "destructive"
                            }
                        >
                            {tenant.statusPembayaran.toUpperCase()}
                        </Badge>
                    </div>
                    {tenant.kontakDarurat && (
                        <div>
                            <span className="font-medium">Kontak Darurat:</span>{" "}
                            {tenant.kontakDarurat}
                        </div>
                    )}
                    {tenant.catatan && (
                        <div className="md:col-span-2">
                            <span className="font-medium">Catatan:</span>{" "}
                            {tenant.catatan}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
