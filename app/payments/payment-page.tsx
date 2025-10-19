"use client";
import { CreditCardIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { PaymentsForm } from "@/app/payments/payment-form";
import { ButtonToolTip } from "@/components/mini/my-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format";
import { useInvoiceStore } from "@/store/useInvoiceStore";


export function PaymentPage() {
    // { invoices }: { invoices: Invoice[] }
    const { invoices, addInvoice } = useInvoiceStore();
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Pembayaran</CardTitle>
                    <PaymentsForm saveForm={ addInvoice }/>
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
                                <TableCell>{ formatPrice(inv.jumlah) }</TableCell>
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
                                    <ButtonToolTip
                                        asChild
                                        text={ "Detail Payment" }
                                        variant={ "outline" }
                                    >
                                        <Link href={ `/payments/${ inv.id }` }>
                                            <CreditCardIcon/>
                                        </Link>
                                    </ButtonToolTip>

                                    <ButtonToolTip
                                        asChild
                                        text={ "Detail Customer" }
                                        variant={ "outline" }
                                    >
                                        <Link href={ `/tenants/${ inv.id }` }>
                                            <UserCircleIcon/>
                                        </Link>
                                    </ButtonToolTip>
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
