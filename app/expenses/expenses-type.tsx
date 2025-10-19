export type Expense = {
    id: string;
    kategori:
        | "listrik"
        | "air"
        | "internet"
        | "kebersihan"
        | "perbaikan"
        | "lainnya";
    keterangan: string;
    tanggal: string;
    jumlah: number;
};
