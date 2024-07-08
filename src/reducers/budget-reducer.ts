import { DraftExpense, Expense } from '../types/index'
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions =
  { type: 'set-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'hide-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense['id'] } } |
  { type: 'edit-expense', payload: { id: Expense['id'] } } |
  { type: 'update-expense', payload: { expense: Expense } }

export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[]
  editingId: Expense['id']
}

const getExpensesStorage = () => {
  const expenses = localStorage.getItem('expenses')
  return expenses?.length ? JSON.parse(expenses) : []
}

const getBudgetStorage = () => {
  const budget = localStorage.getItem('budget')
  return budget?.length ? +budget : 0
}

export const initialState: BudgetState = {
  budget: getBudgetStorage(),
  modal: false,
  expenses: getExpensesStorage(),
  editingId: ''
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {

  if (action.type === 'set-budget') {
    return {
      ...state,
      budget: action.payload.budget
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'hide-modal') {
    return {
      ...state,
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'add-expense') {
    const newExpense: Expense = {
      ...action.payload.expense,
      id: uuidv4()
    }
    return {
      ...state,
      modal: false,
      expenses: [...state.expenses, newExpense]
    }
  }

  if (action.type === 'remove-expense') {
    const newExpenses = state.expenses.filter(e => e.id !== action.payload.id)
    return {
      ...state,
      expenses: newExpenses
    }
  }

  if (action.type === 'edit-expense') {
    return {
      ...state,
      modal: true,
      editingId: action.payload.id
    }
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      modal: false,
      editingId: '',
      expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense)
    }

  }

  return state
}
