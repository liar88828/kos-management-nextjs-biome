import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";


export default function ReportsPage() {
    // Static placeholders to represent summary metrics
    const pendapatanBulanan = 16500000;
    const pendapatanTahunan = 190000000;
    const kamarKosong = 6;
    const penyewaAktif = 24;

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">
                            Pendapatan Bulan Ini
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="font-semibold text-2xl">
                        { formatPrice(pendapatanBulanan) }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">
                            Pendapatan Tahun Ini
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="font-semibold text-2xl">
                        { formatPrice(pendapatanTahunan) }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">
                            Penyewa Aktif
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="font-semibold text-2xl">
                        { penyewaAktif }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">
                            Kamar Kosong
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="font-semibold text-2xl">
                        { kamarKosong }
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Export Laporan</CardTitle>
                    <div className="text-muted-foreground text-sm">
                        Export ke Excel / PDF (placeholder)
                    </div>
                </CardHeader>
                <CardContent className="flex gap-3">
                    <Button variant="secondary">Export Excel</Button>
                    <Button className="bg-primary text-primary-foreground">
                        Export PDF
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}
