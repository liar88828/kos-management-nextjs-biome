"use client";
import { motion } from "framer-motion";
import { IceCreamConeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type NotFoundPageProps = {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    showSearch?: boolean;
};

export function NotFoundPage({
    title = "Data Tidak Ditemukan",
    description = "Maaf, kami tidak menemukan data yang Anda cari. Coba periksa kembali kata kunci atau buat data baru.",
    actionLabel = "Buat Data Baru",
    onAction,
    showSearch = true,
}: NotFoundPageProps) {
    return (
        <div className="flex min-h-[72vh] items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6 py-12">
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
                initial={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
            >
                <Card className="overflow-hidden rounded-2xl p-0 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <CardContent className="flex flex-col justify-center gap-6 p-10">
                            <div>
                                <h1 className="font-semibold text-3xl tracking-tight md:text-4xl">
                                    {title}
                                </h1>
                                <p className="mt-2 text-muted-foreground text-sm md:text-base">
                                    {description}
                                </p>
                            </div>

                            {showSearch && (
                                <div className="flex w-full items-center gap-3">
                                    <Input
                                        aria-label="search"
                                        className="flex-1"
                                        placeholder="Cari berdasarkan nama, alamat, atau kata kunci..."
                                    />
                                    <Button
                                        className="whitespace-nowrap"
                                        variant="outline"
                                    >
                                        Cari
                                    </Button>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Button
                                    className="rounded-md"
                                    onClick={onAction}
                                    size="lg"
                                >
                                    {actionLabel}
                                </Button>
                                <Button
                                    onClick={() => window.history.back()}
                                    size="lg"
                                    variant="ghost"
                                >
                                    Kembali
                                </Button>
                            </div>

                            <div className="text-muted-foreground text-xs">
                                Tip: gunakan filter atau cek koneksi Anda jika
                                data seharusnya muncul.
                            </div>
                        </CardContent>

                        <div className="flex items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 p-8">
                            <motion.div
                                animate={{ scale: 1, rotate: 0 }}
                                className="w-full max-w-sm"
                                initial={{ scale: 0.96, rotate: -6 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                                    <IceCreamConeIcon />

                                    <div className="mt-6 text-center">
                                        <h3 className="font-medium text-lg text-white">
                                            Kosong tapi penuh potensi ✨
                                        </h3>
                                        <p className="mt-2 text-sm text-white/90">
                                            Halaman ini belum memiliki data.
                                            Anda bisa membuat data baru atau
                                            kembali ke halaman sebelumnya.
                                        </p>

                                        <div className="mt-4 flex justify-center gap-2">
                                            <Button
                                                onClick={onAction}
                                                size="sm"
                                            >
                                                {actionLabel}
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    window.location.reload()
                                                }
                                                size="sm"
                                                variant="outline"
                                            >
                                                Muat Ulang
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 text-center text-white/80 text-xs">
                                    Made with shadcn/ui • Kos Management
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Card>

                <div className="mt-6 text-center text-muted-foreground text-sm">
                    Jika Anda percaya ini sebuah kesalahan, hubungi admin atau
                    cek dokumentasi.
                </div>
            </motion.div>
        </div>
    );
}
