"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


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
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">Kamar</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <div className="font-semibold text-2xl">32</div>
                            <div className="text-muted-foreground text-xs">Total</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg">24 terisi</div>
                            <div className="text-muted-foreground text-xs">6 kosong • 2 renovasi</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">Pendapatan Bulan Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="font-semibold text-2xl">Rp 16.500.000</div>
                        <div className="text-muted-foreground text-xs">+3% dari bulan lalu</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-muted-foreground text-sm">Tagihan Tertunggak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="font-semibold text-2xl">2</div>
                        <div className="text-muted-foreground text-xs">Butuh tindak lanjut</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Grafik Pemasukan vs Pengeluaran</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            className="h-[280px] w-full"
                            config={ {
                                desktop: {
                                    label: "Pemasukan",
                                    color: "var(--chart-1)",
                                },
                                mobile: {
                                    label: "Pengeluaran",
                                    color: "var(--chart-2)",
                                },
                            } }
                        >
                            <ResponsiveContainer height="100%" width="100%">
                                <BarChart data={ pemasukanData }>
                                    <CartesianGrid vertical={ false }/>
                                    <XAxis axisLine={ false } dataKey="bulan" tickFormatter={ (value) => value.slice(0, 3) } tickLine={ false } tickMargin={ 10 }/>
                                    <ChartTooltip content={ <ChartTooltipContent indicator="dashed"/> } cursor={ false }/>
                                    <Bar dataKey="masuk" fill="var(--chart-1)" radius={ 4 }/>
                                    <Bar dataKey="keluar" fill="var(--chart-2)" radius={ 4 }/>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
                        </div>
                        <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
                    </CardFooter>
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
