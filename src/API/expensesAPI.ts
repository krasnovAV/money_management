import axios from "axios";
import {CategoryType} from "../Store/Redusers/shoppingListReducer";
import {ExpensesType} from "../Store/Redusers/expensesReducer";


export const expensesApi = {
    getExpensesList(userId: string) {
        return axios.get<ExpensesType[]>("http://localhost:3002/expenses", {params: {userId}})
    },
    addExpensesList(userId: string, expensesList: CategoryType[], totalPrice: number, date: Date) {
        return axios.post<ExpensesType[]>("http://localhost:3002/expenses",
            {
                userId: userId,
                date: date,
                totalPrice: totalPrice,
                expensesList: expensesList
            }, {params: {userId}}
        )
    }
};

