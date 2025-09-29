"use client";
import { Eye } from "lucide-react";
import Link from "next/link";
import type { Invoice } from "@/app/payments/invoice-type";
import { PaymentsForm } from "@/app/payments/payment-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export function PaymentPage({ invoices }: { invoices: Invoice[] }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Pembayaran</CardTitle>
                    <PaymentsForm/>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-muted-foreground text-sm">
                        Tagihan otomatis akan diintegrasikan kemudian
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Penyewa</TableHead>
                            <TableHead>Kamar</TableHead>
                            <TableHead>Periode</TableHead>
                            <TableHead>Jumlah</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { invoices.map((inv) => (
                            <TableRow key={ inv.id }>
                                <TableCell>{ inv.penyewa }</TableCell>
                                <TableCell>{ inv.kamar }</TableCell>
                                <TableCell>{ inv.periode }</TableCell>
                                <TableCell>
                                    Rp { inv.jumlah.toLocaleString("id-ID") }
                                </TableCell>
                                <TableCell
                                    className={
                                        inv.status === "lunas"
                                            ? "text-emerald-600"
                                            : "text-amber-600"
                                    }
                                >
                                    { inv.status === "lunas"
                                        ? "Lunas"
                                        : "Menunggu" }
                                </TableCell>
                                <TableCell className="space-x-2 text-right">
                                    <Button asChild variant={ "outline" }>
                                        <Link href={ `/payments/${ inv.id }` }>
                                            <Eye/>
                                            Detail Payment
                                        </Link>
                                    </Button>

                                    <Button asChild variant={ "outline" }>
                                        <Link href={ `/tenants/${ inv.id }` }>
                                            <Eye/>
                                            Detail Customer
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
