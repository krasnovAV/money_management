import React, {FC} from "react";
// @ts-ignore
import s from "./ShoppingList.module.css"
import {Button} from "antd";
import {List} from "./List/List";
import {CategoryType, shoppingListActions} from "../../Store/Redusers/shoppingListReducer";
import {useDispatch} from "react-redux";


type PropsType = {
    category: CategoryType;
    editMode: boolean;
    toggleEditMode: (editMode: boolean) => void;
}

export const CategoryWindow: FC<PropsType> = ({category, editMode, toggleEditMode,}) => {
    const dispatch = useDispatch();
    const deleteSelectedCategory = (category: CategoryType) => {
        dispatch(shoppingListActions.deleteSelectedCategory(category))
    }
    return (
        <div className={s.CategoryWindow}>
            <div className={s.CategoryHeader}>
                <div>{category.title}</div>
                <div>
                    <Button onClick={() => deleteSelectedCategory(category)}> Удалить категорию</Button>
                </div>
            </div>

            <div>
                <List editMode={editMode} category={category}/>
            </div>
        </div>
    )
}


