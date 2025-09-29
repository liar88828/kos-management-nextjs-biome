import { exampleInvoices } from "@/app/payments/invoiceExample";
import { PaymentPage } from "@/app/payments/payment-page";

export default function Page() {
    return <PaymentPage invoices={ exampleInvoices }/>;
}
