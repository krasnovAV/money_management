import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Button, Input, InputNumber} from "antd";
import {addIncomeThunk, getIncomes, IncomeItem, IncomeType} from "../../Store/Redusers/incomesReducer";
import {useDispatch} from "react-redux";
// @ts-ignore
import s from "./income.module.css"

export const Income = () => {
        const {isAuth, userId} = useTypedSelector(state => state.auth);
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const {incomes} = useTypedSelector(state => state.incomes);
        const [category, setCategory] = useState("");
        const [sum, setSum] = useState(0);

        useEffect(() => {
            dispatch(getIncomes(userId as string));
        }, [])

        if (!isAuth) {
            navigate("/shoppingList");
        }

        const addIncome = () => {
            const date = new Date();
            let income: IncomeItem = {title: category as string, amount: sum as number}
            dispatch(addIncomeThunk(userId as string, date, income));
            setCategory("");
            setSum(0);
        }

        let incomesForCategories: IncomeItem[] = useMemo(() => calculateIncome(incomes), [incomes]);

        function calculateIncome(incomes: IncomeType[]): IncomeItem[] {
            let categories: string[] = [];
            for (let i = 0; i < incomes.length; i++) {
                let index: number = categories.indexOf(incomes[i].income.title)
                if (index < 0) {
                    categories.push(incomes[i].income.title);
                }
            }
            let tempIncomesForCategories: IncomeItem[] = categories.map(c => {
                return {
                    title: c,
                    amount: 0
                }
            })
            for (let i = 0; i < incomes.length; i++) {
                let index: number = categories.indexOf(incomes[i].income.title)
                tempIncomesForCategories[index].amount += incomes[i].income.amount;
            }
            return tempIncomesForCategories
        }

        return (
            <div>
                <div className={s.incomeForm}>
                    <Input placeholder={"Категория дохода"} value={category} onChange={(e) => {
                        setCategory(e.target.value)
                    }}/>
                    <InputNumber style={{width: 300, marginRight: 30}} placeholder={"сумма"} value={sum}
                                 onChange={(value) => {
                                     setSum(value)
                                 }}/>
                    <Button onClick={addIncome}> Добавить </Button>
                </div>
                <div>
                    {incomesForCategories.map(i => {
                        return (
                            <div className={s.incomeItem}>
                                <div>{i.title}</div>
                                <div>{i.amount}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
;

