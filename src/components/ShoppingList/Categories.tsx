import React, {FC, useEffect, useState} from 'react';
import {Button, Input, Menu, Modal} from "antd";
import 'antd/dist/antd.css';
// @ts-ignore
import s from "./ShoppingList.module.css"
import {DeleteOutlined} from "@ant-design/icons";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getSavedCategories, shoppingListActions, updateSavedCategories} from "../../Store/Redusers/shoppingListReducer";

const {SubMenu} = Menu;

type PropsType = {
    addListForCategory: (category: string) => void;
    editMode: boolean;
    toggleEditMode: (editMode: boolean) => void;
}

export const Categories: FC<PropsType> = ({addListForCategory, editMode, toggleEditMode}) => {
    let categories = useTypedSelector(state => state.shoppingList.categories);
    const {isAuth, userId} = useTypedSelector(state => state.auth)
    const [newCategory, setNewCategory] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth && userId) {
            dispatch(getSavedCategories(userId));
        }
    }, [isAuth]);

    useEffect(() => {
        if (isAuth && userId) {
            dispatch(updateSavedCategories(userId, categories));
        }
    }, [categories])

    const clearList = () => {
        dispatch(shoppingListActions.deleteAllSelectedCategories())
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(shoppingListActions.addCategory(newCategory));
        setNewCategory("");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const deleteCategory = (category: string) => {
        dispatch(shoppingListActions.deleteCategory(category))

    }

    return (
        <div className={s.categories}>
            <Menu className={s.menu} style={{width: 180}}>
                <SubMenu key="category" title="Категории">
                    {categories.map(category => {
                        return (
                            <Menu.Item key={category} className={s.menuItem}>
                                <div>
                                    <div onClick={() => {
                                        addListForCategory(category)
                                    }} className={s.menuItem}>{category}</div>
                                    <div><DeleteOutlined onClick={() => {
                                        deleteCategory(category)
                                    }}/>
                                    </div>
                                </div>
                            </Menu.Item>
                        )
                    })}

                    {/*<AddItem title={"Добавить категорию"} addNewItem={addNewCategory}/>
                    При выносе в отдельный компонент при нажатии на добавление категории не закрывается
                    суб меню */}
                    <Button type="default" onClick={showModal}>
                        Добавить категорию
                    </Button>
                    <Modal title="Добавить категорию" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder={"Добавить категорию"} value={newCategory}
                               onChange={(e) => setNewCategory(e.target.value)}/>
                    </Modal>
                </SubMenu>
            </Menu>
            <div className={s.ButtonBlock}>
                {!editMode ? <Button onClick={() => toggleEditMode(editMode)}> Редактировать</Button>
                    : <Button onClick={() => toggleEditMode(editMode)}>Готово</Button>}
                <Button onClick={clearList}> Удалить все</Button>
            </div>
        </div>
    );
};


