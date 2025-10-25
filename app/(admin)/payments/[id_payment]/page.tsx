import InvoiceDetail from "@/app/(admin)/payments/invoice-detail";


export default async function Page({
                                       params,
                                   }: PageProps<"/payments/[id_payment]">) {
    const { id_payment } = await params;
    console.log(id_payment);
    // const invoice = exampleInvoices.find((item) => item.id === id_payment);
    return (
        <InvoiceDetail
            idPayment={ id_payment }
            // invoice={invoice}
        />
    );
}
