import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";

// @ts-ignore
import s from "./expenses.module.css"
import {useNavigate} from "react-router-dom";
import {Button, Checkbox} from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getExpensesList} from "../../Store/Redusers/expensesReducer";
import {useDispatch} from "react-redux";
import {CategoryType} from "../../Store/Redusers/shoppingListReducer";
import {PieChart} from "../Common/PieChart";

export const Expenses = () => {
    const categories = useTypedSelector(state => state.shoppingList.categories);
    const {userId, isAuth} = useTypedSelector(state => state.auth);
    const navigate = useNavigate();
    const [periodMode, setPeriodMode] = useState(false);
    const dispatch = useDispatch();
    const {isFetching, expenses} = useTypedSelector(state => state.expenses);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [expensesForPeriod, setExpensesForPeriod] = useState(expenses)

    useEffect(() => {
        dispatch(getExpensesList(userId as string))
    }, [])

    if (!isAuth) {
        navigate("/shoppingList")
    }
    if (isFetching) {
        return (
            <h1> Loading...</h1>
        )
    }

    let totalExpenses = 0;
    let fullExpensesForCategories: CategoryType[] = categories.map(category => {
        return {
            title: category,
            totalCategoryPrice: 0
        }
    })
    let tempCategories: string[] = categories;

    for (let i = 0; i < expensesForPeriod.length; i++) {
        for (let j = 0; j < expensesForPeriod[i].expensesList.length; j++) {
            let index = tempCategories.indexOf(expensesForPeriod[i].expensesList[j].title, 0)
            if (index >= 0) {
                fullExpensesForCategories[index].totalCategoryPrice += expensesForPeriod[i].expensesList[j].totalCategoryPrice
            } else {
                tempCategories.push(expensesForPeriod[i].expensesList[j].title);
                fullExpensesForCategories.push(expensesForPeriod[i].expensesList[j])

                //не самое лучшее решение. т.к. если есть в списке расходов категория, которой нет в списке сохраненных категорий
                // она добавляется в него и вычисления происходят по новой
                //setCategories([...categories, expenses[i].expensesList[j].title])
            }
        }
        totalExpenses += expensesForPeriod[i].totalPrice;
    }

    const setPeriod = () => {
        const start = startDate.getTime();
        const end = endDate.getTime();
        if (start > end) {
            alert("Начальная дата больше конечной!")
        } else {
            setExpensesForPeriod(expenses.filter(e => {
                let temp = new Date(e.date).getTime();
                return (start <= temp && temp <= end)
            }))
        }
    }

    return (
        <div className={s.wrapper}>
            <div>
                <div>
                    <Checkbox style={{fontSize: "25px", alignItems: "center"}}
                              onChange={() => {
                                  setPeriodMode(!periodMode)
                              }}>Выбрать период</Checkbox>
                </div>
                {periodMode ? <div className={s.datePickerWrapper}>
                        <DatePicker className={s.datePicker}
                                    selected={startDate}
                                    onChange={(date: Date) => setStartDate(date)}/>
                        <DatePicker className={s.datePicker}
                                    selected={endDate}
                                    onChange={(date: Date) => setEndDate(date)}/>
                        <Button size={"large"} onClick={setPeriod}>Выбрать</Button>
                    </div>
                    : "Расходы за всё время"}

            </div>
            <h1>Потрачено всего: {totalExpenses}</h1>
            <div>{fullExpensesForCategories.map(m => {
                return (
                    <div key={m.title} className={s.expensesItem}>
                        <div>{m.title}</div>
                        <div>{m.totalCategoryPrice}</div>
                    </div>
                )
            })}</div>
            <div style={{width: "400px", height: "400px"}}>
                <PieChart list={fullExpensesForCategories}/>
            </div>
        </div>
    );
};

