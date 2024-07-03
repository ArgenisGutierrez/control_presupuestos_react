import { useMemo, useState } from "react"
import { useBudgets } from "../hooks/useBudget"

export function BudgetForm({ }) {

  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudgets()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'set-budget', payload: { budget: budget } })
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-black text-center">
          Definir Presupuesto
        </label>
        <input
          type="number"
          min={0}
          id="budget"
          className="w-full bg-white border border-gray-200 p-2"
          value={budget}
          name="budget"
          onChange={handleChange}
        />
      </div>

      <input type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-800 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
        disabled={isValid}
      />

    </form>
  )
}
