import {combineReducers} from "redux";
import {ShoppingListReducer} from "./shoppingListReducer";
import {authReducer} from "./authReducer";
import {expensesReducer} from "./expensesReducer";
import {incomesReducer} from "./incomesReducer";


export const rootReducer = combineReducers({
    shoppingList: ShoppingListReducer,
    auth: authReducer,
    expenses: expensesReducer,
    incomes: incomesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>