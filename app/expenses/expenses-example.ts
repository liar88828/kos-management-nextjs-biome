import type { Expense } from "@/app/expenses/expenses-type";


export const expensesExample: Expense[] = [
    {
        id: "e1",
        jumlah: 2000000,
        kategori: "listrik",
        keterangan: "Tagihan PLN",
        tanggal: "2025-09-05",
    },
    {
        id: "e2",
        jumlah: 450000,
        kategori: "internet",
        keterangan: "WiFi bulanan",
        tanggal: "2025-09-03",
    },
];
