import { useBudgets } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function BudgetTracker() {
  const { state, dispatch, totalExpense, available } = useBudgets()
  const percentage = +((totalExpense / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#dc2626': '#3b82f6',
            trailColor: '#f5f5f5',
            textSize:10,
            textColor:'#3b82f6'
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          onClick={() => dispatch({ type: 'reset-budget' })}
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
