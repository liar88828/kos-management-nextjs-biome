"use client";
import { EditProfileDialog } from "@/app/user-tenant/profile/profile-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenantStore } from "@/store/useTenantStore";
import { useParams } from "next/navigation";


export function ProfilePage() {
    const params = useParams<{ id: string }>();
    const { getTenantById, tenants } = useTenantStore();
    const tenant = tenants[0];
    // const tenant = getTenantById(params.id);

    if (!tenant) {
        return (
            <div className="py-20 text-center">
                <h2 className="font-semibold text-2xl text-muted-foreground">Data profil belum tersedia</h2>
            </div>
        );
    }

    return (
        <>
            {/* Header with Avatar */ }
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 ring-2 ring-primary">
                            <AvatarImage alt={ tenant.nama } src={ `https://api.dicebear.com/7.x/initials/svg?seed=${ tenant.nama }` }/>
                            <AvatarFallback>{ tenant.nama[0] }</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-semibold text-3xl">{ tenant.nama }</h2>
                            <p className="text-muted-foreground text-sm">Member sejak { tenant.masuk || "2022" }</p>
                            <Badge
                                className={ `mt-2 ${ tenant.statusPembayaran === "lunas" ? "bg-green-500" : "bg-red-500" }` }>{ tenant.statusPembayaran === "lunas" ? "Lunas" : "Tertunggak" }</Badge>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Biodata Section */ }
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="font-semibold text-xl">Biodata Lengkap</CardTitle>
                    <EditProfileDialog/>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    <Info label="Nama Lengkap" value={ tenant.nama }/>
                    <Info label="Email" value={ tenant.email ?? "-" }/>
                    <Info label="Nomor Kontak" value={ tenant.kontak }/>
                    <Info label="Pekerjaan" value={ tenant.pekerjaan ?? "-" }/>
                    <Info label="Jenis Kelamin" value={ tenant.jenisKelamin ?? "-" }/>
                    <Info label="Tanggal Lahir" value={ tenant.tanggalLahir ?? "-" }/>
                    <Info label="Nomor KTP" value={ tenant.ktp ?? "-" }/>
                    <Info label="Kontak Darurat" value={ tenant.kontakDarurat ?? "-" }/>
                    <Info label="Deposit" value={ `Rp ${ tenant.deposit?.toLocaleString() ?? "0" }` }/>
                    <Info label="Catatan" value={ tenant.catatan ?? "Tidak ada catatan" }/>
                </CardContent>
            </Card>

            {/* Kamar Info */ }
            <Card>
                <CardHeader>
                    <CardTitle className="font-semibold text-xl">Informasi Kamar</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    <Info label="Nomor Kamar" value={ tenant.kamar }/>
                    <Info label="Tanggal Masuk" value={ tenant.masuk ?? "-" }/>
                    <Info label="Tanggal Keluar" value={ tenant.keluar ?? "-" }/>
                </CardContent>
            </Card>

            {/* Account Controls */ }
            <Card>
                <CardHeader>
                    <CardTitle>Pengaturan Akun</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">Kelola keamanan akun dan sesi Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                        <Button variant="secondary">Ubah Kata Sandi</Button>
                        <Button variant="destructive">Keluar Akun</Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}


function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-muted-foreground text-sm">{ label }</p>
            <p className="font-medium text-base">{ value }</p>
        </div>
    );
}
