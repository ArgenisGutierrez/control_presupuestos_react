import { useMemo } from "react"

import { useBudgets } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"
export function ExpenseList() {
  const { state } = useBudgets()
  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])
  return (
    <div className="mt-10">
      {isEmpty ?
        <p className="text-2xl font-bold text-gray-600">No hay Gastos</p> :
        (
          <>
            <p className="text-gray-600 text-2xl font-bold my-5">Lista de Gastos</p>
            {state.expenses.map(expense => (
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
