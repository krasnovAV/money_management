import {CategoryType} from "./shoppingListReducer";
import {InferActionsTypes} from "./rootReducer";
import {Dispatch} from "redux";
import {expensesApi} from "../../API/expensesAPI";

export type ExpensesType = {
    userId: string,
    date: string,
    expensesList: CategoryType[],
    totalPrice: number,
}

interface IExpenses {
    expenses: ExpensesType[];
    isFetching: boolean;
}

const initialState: IExpenses = {
    expenses: [],
    isFetching: false,
}

type ActionTypes = InferActionsTypes<typeof expensesActions>
export const expensesActions = {
    setExpenses: (expenses: ExpensesType[]) => ({type: "SET_EXPENSES", payload: expenses} as const),
    addExpenses: (expenses: ExpensesType) => ({type: "ADD_EXPENSES", payload: expenses} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "expenses/TOGGLE_IS_FETCHING", payload: isFetching} as const),
}

export const expensesReducer = (state = initialState, actions: ActionTypes): IExpenses => {
    switch (actions.type) {
        case "ADD_EXPENSES":
            return {...state, expenses: [...state.expenses, actions.payload]}
        case "SET_EXPENSES":
            return {...state, expenses: actions.payload}
        case "expenses/TOGGLE_IS_FETCHING":
            return {...state, isFetching: actions.payload}
        default:
            return state
    }
}

export const getExpensesList = (userId: string) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        dispatch(expensesActions.toggleIsFetching(true));
        const response = await expensesApi.getExpensesList(userId)
        dispatch(expensesActions.setExpenses(response.data))
        dispatch(expensesActions.toggleIsFetching(false));
    } catch (e: any) {
        dispatch(expensesActions.toggleIsFetching(false));
        alert("Ошибка получения списка категорий ")
    }
}