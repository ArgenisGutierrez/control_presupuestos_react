import { useMemo } from "react";
import { useBudgets } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";

export function BudgetTracker() {
  const { state } = useBudgets()
  const totalExpense = useMemo(() => {
    return state.expenses.reduce((total, expense) => total + expense.expenseAmount, 0)
  }, [state.expenses])
  const available = useMemo(() => {
    return state.budget - totalExpense
  }, [state.expenses])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="public/grafico.jpg" alt="Grafica de gastos" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-sky-500 w-full p-2 text-white uppercase font-bold rounded-lg">
          Reiniciar Presupuesto
        </button>
        <AmountDisplay
          label={"Presupuesto"}
          amount={state.budget}
        />
        <AmountDisplay
          label={"Dispobible"}
          amount={available}
        />
        <AmountDisplay
          label={"Gastado"}
          amount={totalExpense}
        />
      </div>
    </div>
  )

}
