import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useMemo } from "react"

import { formatDate } from "../helpers"
import { Expense } from "../types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudgets } from '../hooks/useBudget';

type ExpenseDetailProps = {
  expense: Expense
}
export function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudgets()
  const categoriInfo = useMemo(() => categories.filter(category => category.id === expense.expenseCategory)[0], [expense])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'edit-expense', payload: { id: expense.id } })}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={0.7}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white w-full shadow-lg p-10 border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img src={`/icono_${categoriInfo.icon}.svg`}
              alt={`Icono ${categoriInfo.name}`}
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoriInfo.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>
          <AmountDisplay
            amount={expense.expenseAmount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
