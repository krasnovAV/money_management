import React, {useState} from 'react';
import {Categories} from "./Categories";
// @ts-ignore
import s from "./ShoppingList.module.css";
import {CategoryWindow} from "./CategoryWindow";
import {Button} from "antd";
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useDispatch} from "react-redux";
import {addExpensesListToStatistics, shoppingListActions} from '../../Store/Redusers/shoppingListReducer';


export const ShoppingList = () => {
    const {selectedCategories, totalPrice} = useTypedSelector(state => state.shoppingList);
    const {userId, isAuth} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(true);

    const toggleEditMode = (editMode: boolean) => {
        setEditMode(!editMode);
    }

    const addListForCategory = (newCategory: string) => {
        if (selectedCategories.every(category => category.title !== newCategory)) {
            dispatch(shoppingListActions.selectCategory(newCategory))
        }
    }

    const addToStatistics = async () => {
        try {
            if (!isAuth) {
                console.log(selectedCategories, totalPrice)
            } else {
                dispatch(addExpensesListToStatistics(userId as string, selectedCategories, totalPrice))
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <div className={s.body}>
            <Categories addListForCategory={addListForCategory}
                        editMode={editMode} toggleEditMode={toggleEditMode}/>

            {!selectedCategories.length ? <div> категории не выбраны</div>
                : <div className={s.ContentBody}>
                    {selectedCategories.map(category => {
                        return <CategoryWindow key={category.title} category={category}
                                               editMode={editMode}
                                               toggleEditMode={toggleEditMode}/>
                    })}
                </div>}
            <div className={s.totalPrice}>
                <Button onClick={addToStatistics}>Добавить в статистику</Button>
                <div>Итого: {totalPrice}</div>
            </div>
        </div>
    );
};

