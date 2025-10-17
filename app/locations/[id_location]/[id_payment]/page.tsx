import InvoiceDetail from "@/app/payments/invoice-detail";
import { exampleInvoices } from "@/app/payments/invoiceExample";


export default async function Page({
                                       params,
                                   }: PageProps<"/locations/[id_location]/[id_payment]">) {
    const { id_payment } = await params;
    const invoice = exampleInvoices.find((item) => item.id === id_payment);
    return <InvoiceDetail invoice={ invoice }/>;
}
