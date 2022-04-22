import axios from "axios";
import {IncomeItem, IncomeType} from "../Store/Redusers/incomesReducer";


export const incomeApi = {
    getIncomes(userId: string) {
        return axios.get<IncomeType[]>("http://localhost:3002/income", {params: {userId}})
    },
    addIncome(income: IncomeItem, date: Date, userId:string) {
        return axios.post("http://localhost:3002/income",
            {
                userId: userId,
                date: date,
                income: income
            }, {params: {userId}}
        )
    }
};

