export function formatPrice(rawPrice: number) {
    return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        minimumFractionDigits: 0, // no decimals
        style: "currency",
    }).format(rawPrice);
}