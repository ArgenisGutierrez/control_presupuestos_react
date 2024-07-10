import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudgets } from "../hooks/useBudget";

export function FilterExpense() {
  const { dispatch } = useBudgets()
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'filter-expenses', payload: { category: e.target.value } })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10" >
      <form>
        <div className="flex flex-1 md:flex-row md:items-center gap-5">
          <label htmlFor="filter">Filtrar Gastos</label>
          <select id="filter"
            className="bg-slate-100 p-3 flex-1 rounded"
            onChange={handleChange}
          >
            <option value="">-- Todas las Categorias --</option>
            {categories.map(category => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}
