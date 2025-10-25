import InvoiceDetail from "@/app/(admin)/payments/invoice-detail";


export default async function Page(
    {
        params,
    }: PageProps<"/locations/[id_location]/[id_payment]">) {
    const { id_payment } = await params;
    // const invoice = exampleInvoices.find((item) => item.id === id_payment);
    // const invoice = useInvoiceStore((state) => state.getInvoiceById)(id_payment);

    return <InvoiceDetail
        // invoice={ invoice }
        idPayment={ id_payment }
    />;
}
