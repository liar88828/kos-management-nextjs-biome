import { expensesExample } from "@/app/(admin)/expenses/expenses-example";
import { ExpensesPage } from "@/app/(admin)/expenses/expensesPage";


export default function Page() {
    return <ExpensesPage expense={ expensesExample }/>;
}
