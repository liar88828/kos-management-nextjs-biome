"use client";

import type { Invoice } from "@/app/payments/invoice-type";
import type { Tenant } from "@/app/tenants/tenant-type";
import { NotFoundPage } from "@/components/notFoundPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type InvoiceDetailProps = {
    invoice?: Invoice;
};

export default function InvoiceDetail({ invoice }: InvoiceDetailProps) {
    if (!invoice) {
        return <NotFoundPage/>;
    }

    return (
        <div className="mx-auto max-w-3xl p-6">
            <Card className="shadow-lg">
                {/* Header */ }
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Invoice #{ invoice.nomorInvoice }</CardTitle>
                    <Badge
                        // @ts-expect-error
                        variant={
                            invoice.status === "lunas"
                                ? "success"
                                : invoice.status === "menunggu"
                                    ? "secondary"
                                    : invoice.status === "tertunda"
                                        ? "destructive"
                                        : "outline"
                        }
                    >
                        { invoice.status.toUpperCase() }
                    </Badge>
                </CardHeader>

                <Separator/>

                {/* Invoice Info */ }
                <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Penyewa
                            </p>
                            <p className="font-medium">{ invoice.penyewa }</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Kamar
                            </p>
                            <p className="font-medium">{ invoice.kamar }</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Periode
                            </p>
                            <p className="font-medium">{ invoice.periode }</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Jumlah
                            </p>
                            <p className="font-medium">
                                Rp { invoice.jumlah.toLocaleString("id-ID") }
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Tanggal Terbit
                            </p>
                            <p className="font-medium">
                                { invoice.tanggalTerbit }
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Jatuh Tempo
                            </p>
                            <p className="font-medium">{ invoice.jatuhTempo }</p>
                        </div>
                    </div>

                    { invoice.diskon && (
                        <p className="text-green-600 text-sm">
                            Diskon: Rp { invoice.diskon.toLocaleString("id-ID") }
                        </p>
                    ) }
                    { invoice.denda && (
                        <p className="text-red-600 text-sm">
                            Denda: Rp { invoice.denda.toLocaleString("id-ID") }
                        </p>
                    ) }

                    { invoice.catatan && (
                        <div>
                            <p className="text-muted-foreground text-sm">
                                Catatan
                            </p>
                            <p className="font-medium">{ invoice.catatan }</p>
                        </div>
                    ) }

                    <Separator/>

                    {/* Tenant Info */ }
                    <div>
                        <h3 className="mb-2 font-semibold text-lg">
                            Data Penyewa
                        </h3>
                        { invoice.Customer.map((tenant: Tenant) => (
                            <div
                                className="mb-2 rounded-md border bg-muted/30 p-3"
                                key={ tenant.id }
                            >
                                <p className="font-medium">{ tenant.nama }</p>
                                <p className="text-muted-foreground text-sm">
                                    Kontak: { tenant.kontak }
                                </p>
                                { tenant.pekerjaan && (
                                    <p className="text-muted-foreground text-sm">
                                        Pekerjaan: { tenant.pekerjaan }
                                    </p>
                                ) }
                                { tenant.ktp && (
                                    <p className="text-muted-foreground text-sm">
                                        KTP: { tenant.ktp }
                                    </p>
                                ) }
                            </div>
                        )) }
                    </div>
                </CardContent>

                <Separator/>

                {/* Footer Actions */ }
                <div className="flex justify-end gap-3 p-4">
                    <Button variant="secondary">Unduh PDF</Button>
                    <Button variant="default">Kirim via Email</Button>
                </div>
            </Card>
        </div>
    );
}
