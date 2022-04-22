import {InferActionsTypes} from "./rootReducer";
import {Dispatch} from "redux";
import {incomeApi} from "../../API/incomesAPI";

export type IncomeItem = {
    title: string,
    amount: number
}

export type IncomeType = {
    userId: string,
    date: Date,
    income: IncomeItem,
}

interface IIncomes {
    incomes: IncomeType[];
    isFetching: boolean;
}

const initialState: IIncomes = {
    incomes: [],
    isFetching: false,
}

type ActionTypes = InferActionsTypes<typeof incomesActions>
export const incomesActions = {
    setIncomes: (incomes: IncomeType[]) => ({type: "SET_INCOMES", payload: incomes} as const),
    addIncome: (income: IncomeType) => ({type: "ADD_INCOME", payload: income} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "incomes/TOGGLE_IS_FETCHING", payload: isFetching} as const),
}

export const incomesReducer = (state = initialState, actions: ActionTypes): IIncomes => {
    switch (actions.type) {
        case "ADD_INCOME":
            return {...state, incomes: [...state.incomes, actions.payload]}
        case "SET_INCOMES":
            return {...state, incomes: actions.payload}
        case "incomes/TOGGLE_IS_FETCHING":
            return {...state, isFetching: actions.payload}
        default:
            return state
    }
}

export const getIncomes = (userId: string) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        dispatch(incomesActions.toggleIsFetching(true));
        const response = await incomeApi.getIncomes(userId)
        dispatch(incomesActions.setIncomes(response.data))
        dispatch(incomesActions.toggleIsFetching(false));
    } catch (e: any) {
        dispatch(incomesActions.toggleIsFetching(false));
        alert("Ошибка получения доходов ")
    }
}

export const addIncomeThunk = (userId: string, date: Date, income: IncomeItem) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        dispatch(incomesActions.toggleIsFetching(true));
        const response = await incomeApi.addIncome(income, date, userId)
        dispatch(incomesActions.addIncome(response.data));
        dispatch(incomesActions.toggleIsFetching(false));
    } catch (e: any) {
        dispatch(incomesActions.toggleIsFetching(false));
        alert("Ошибка получения доходов ")
    }
}