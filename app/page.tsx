"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const pemasukanData = [
    { bulan: "Jan", masuk: 15_000_000, keluar: 4_000_000 },
    { bulan: "Feb", masuk: 15_000_000, keluar: 4_500_000 },
    { bulan: "Mar", masuk: 16_000_000, keluar: 5_200_000 },
    { bulan: "Apr", masuk: 16_500_000, keluar: 4_900_000 },
];

export default function DashboardPage() {
    // NOTE: This is a server component; charts render via lightweight client wrappers in ui/chart
    const penyewaBelumBayar = [
        { nama: "Andi", kamar: "A-01", jatuhTempo: "10 Sep 2025" },
        { nama: "Siti", kamar: "B-03", jatuhTempo: "12 Sep 2025" },
    ];

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">
                            Kamar
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <div className="font-semibold text-2xl">32</div>
                            <div className="text-muted-foreground text-xs">
                                Total
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg">24 terisi</div>
                            <div className="text-muted-foreground text-xs">
                                6 kosong • 2 renovasi
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">
                            Pendapatan Bulan Ini
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="font-semibold text-2xl">
                            Rp 16.500.000
                        </div>
                        <div className="text-muted-foreground text-xs">
                            +3% dari bulan lalu
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">
                            Tagihan Tertunggak
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="font-semibold text-2xl">2</div>
                        <div className="text-muted-foreground text-xs">
                            Butuh tindak lanjut
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Grafik Pemasukan vs Pengeluaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[280px]"
                            config={ {
                                masuk: {
                                    label: "Pemasukan",
                                    color: "hsl(var(--primary))",
                                },
                                keluar: {
                                    label: "Pengeluaran",
                                    color: "hsl(var(--muted-foreground))",
                                },
                            } }
                        >
                            <BarChart data={ pemasukanData }>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={ false }
                                />
                                <XAxis
                                    axisLine={ false }
                                    dataKey="bulan"
                                    tickLine={ false }
                                />
                                <ChartTooltip
                                    content={ <ChartTooltipContent/> }
                                />
                                <Bar
                                    dataKey="masuk"
                                    fill="var(--color-masuk)"
                                    radius={ 4 }
                                />
                                <Bar
                                    dataKey="keluar"
                                    fill="var(--color-keluar)"
                                    radius={ 4 }
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Penyewa Belum Bayar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Kamar</TableHead>
                                    <TableHead>Jatuh Tempo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                { penyewaBelumBayar.map((p) => (
                                    <TableRow key={ p.nama }>
                                        <TableCell>{ p.nama }</TableCell>
                                        <TableCell>{ p.kamar }</TableCell>
                                        <TableCell>{ p.jatuhTempo }</TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
