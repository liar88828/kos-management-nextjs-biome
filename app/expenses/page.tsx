import { expensesExample } from "@/app/expenses/expensesExample";
import { ExpensesPage, } from "@/app/expenses/expensesPage";

export default function Page() {
    return <ExpensesPage expense={ expensesExample }/>;
}
