import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { categories } from "../data/categories";
import { DraftExpense, Value } from "../types";

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ErrorMessage } from "./ErrorMessage";
import { useBudgets } from "../hooks/useBudget";

export function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    expenseAmount: 0,
    expenseName: '',
    expenseCategory: '',
    date: new Date()
  })
  const [error, setError] = useState('')
  const { state, dispatch, available } = useBudgets()
  const [previusAmount, setPreviusAmount] = useState(0)

  useEffect(() => {
    if (!state.editingId) return
    const expenseToEdit = state.expenses.filter(expense => expense.id === state.editingId)[0]
    setPreviusAmount(expenseToEdit.expenseAmount)
    setExpense(expenseToEdit)
  }, [state.editingId])

  const handleChannge = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setExpense({
      ...expense,
      [name]: name === 'expenseAmount' ? Number(value) : value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }
    if ((expense.expenseAmount - previusAmount) > available) {
      setError(`La cantidad sobrepasa el presupuesto disponible: $${available}`)
      return
    }
    //Agregar el gasto
    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }
    setPreviusAmount(0)
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? 'Editar Gasto' : 'Registrar Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre del gasto:</label>
        <input
          type="text"
          className="bg-slate-100 p-2"
          name="expenseName"
          id="expenseName"
          value={expense.expenseName}
          onChange={handleChannge}
          placeholder="Agrega un nombre" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseAmount" className="text-xl">Cantidad:</label>
        <input
          type="number"
          className="bg-slate-100 p-2"
          name="expenseAmount"
          min={0}
          id="expenseAmount"
          value={expense.expenseAmount}
          onChange={handleChannge}
          placeholder="Agrega la cantidad" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseCategory" className="text-xl">Categoria:</label>
        <select name="expenseCategory"
          className="bg-slate-100 p-2"
          value={expense.expenseCategory}
          onChange={handleChannge}
          id="expenseCategory">
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option value={category.id} key={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">Fecha:</label>
        <DatePicker
          name="date"
          className="bg-slate-100"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input type="submit"
        className="bg-blue-400 w-full p-2 text-white font-bold uppercase cursor-pointer rounded-lg"
        value={state.editingId ? 'Editar Gasto' : 'Registrar Gasto'}
      />

    </form>
  )
}
