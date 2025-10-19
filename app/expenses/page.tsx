import { expensesExample } from "@/app/expenses/expenses-example";
import { ExpensesPage } from "@/app/expenses/expensesPage";


export default function Page() {
    return <ExpensesPage expense={ expensesExample }/>;
}
