import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { budgetReducer, BudgetState, initialState, BudgetActions } from "../reducers/budget-reducer"

// Define el type de los props de context
type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpense: number
  available: number
}

// Define el type de los props de provider
type BudgetProviderProps = {
  children: ReactNode
}

//Define el context
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

//Define el provider
export const BudgetProvider = ({ children }: BudgetProviderProps) => {

  //Define de donde el provieder obtiene la informacion, en este caso nuestro reducer
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  const totalExpense = useMemo(() => state.expenses.reduce((total, expense) => total + expense.expenseAmount, 0), [state.expenses])
  const available = state.budget - totalExpense

  return (
    //Conecta el context con el provider
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpense,
        available
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
