import InvoiceDetail from "@/app/payments/invoice-detail";
import { exampleInvoices } from "@/app/payments/invoiceExample";

export default async function Page({ params }: PageProps<'/payments/[id_payment]'>) {
    const { id_payment } = await params
    console.log(id_payment)
    const invoice = exampleInvoices.find(item => item.id === id_payment)
    return <InvoiceDetail invoice={ invoice }/>;
}
