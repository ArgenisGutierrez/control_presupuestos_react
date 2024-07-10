import { useMemo } from "react"
import { useBudgets } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"

export function ExpenseList() {

  const { state } = useBudgets()
  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.expenseCategory === state.currentCategory) : state.expenses
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

  return (
    <div className="mt-10 bg-white rounded-lg shadow-lg p-5">
      {isEmpty ?
        <p className="text-2xl font-bold text-gray-600">No hay Gastos</p> :
        (
          <>
            <p className="text-gray-600 text-2xl font-bold my-5">Lista de Gastos</p>
            {filteredExpenses.map(expense => (
              <ExpenseDetail
                key={expense.id}
                expense={expense}
              />
            ))}
          </>
        )
      }
    </div>
  )
}
