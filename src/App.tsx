import { useReducer } from "react"
import { BudgetForm } from "./components/BudgetForm"
import { budgetReducer, initialState } from "./reducers/budget-reducer"

function App() {

  const [state, dispatch] = useReducer(budgetReducer, initialState)

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de Gastos</h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <BudgetForm
          budget={state.budget}
          dispatch={dispatch}
        />
      </div>
    </>
  )
}

export default App
