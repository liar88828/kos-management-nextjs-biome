export function formatPrice(rawPrice: number) {
    return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        minimumFractionDigits: 0, // no decimals
        style: "currency",
    }).format(rawPrice);
}


export function formatDate(rawDate: string | number | undefined | Date) {
    if (!rawDate) {
        return "-";
    }
    return new Date(rawDate).toLocaleString("id-ID");
}
