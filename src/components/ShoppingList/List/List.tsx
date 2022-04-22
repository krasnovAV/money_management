import React, {FC, useState} from 'react';
import {Button, Input, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {addNewItem} from "../../../Utils/Utils";
import {MyListItem} from "./MyListItem";
// @ts-ignore
import s from "./List.module.css";
import {useDispatch} from "react-redux";
import {CategoryType, shoppingListActions} from "../../../Store/Redusers/shoppingListReducer";

type PropsType = {
    editMode: boolean;
    category: CategoryType
}

export const List: FC<PropsType> = ({editMode, category}) => {
    const [listItem, setListItem] = useState("");
    const [list, setList] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    }
    const handleOk = () => {
        setIsModalVisible(false);
        setList(addNewItem(list, listItem))
        setListItem("")
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const addToTotalCategoryPrice = (price: number) => {
        dispatch(shoppingListActions.changeTotalCategoryPrice(category.title, +(category.totalCategoryPrice + price).toFixed(2)));
        dispatch(shoppingListActions.addToTotalPrice(+(price).toFixed(2)));
    }

    const subtractFromTotalCategoryPrice = (price: number) => {
        dispatch(shoppingListActions.changeTotalCategoryPrice(category.title, +(category.totalCategoryPrice - price).toFixed(2)));
        dispatch(shoppingListActions.subtractFromTotalPrice(+(price).toFixed(2)));

    }

    const deleteListItem = (listItem: string, price: number) => {
        setList(list.filter(item => item !== listItem));
        subtractFromTotalCategoryPrice(price);
    }

    return (
        <div>
            <div>
                {list.map(item => {
                    return <MyListItem key={item} listItem={item} editMode={editMode}
                                       deleteListItem={deleteListItem} addToTotalCategoryPrice={addToTotalCategoryPrice}
                                       subtractFromTotalCategoryPrice={subtractFromTotalCategoryPrice}/>
                })}
            </div>
            <div className={s.buttonBlock}>
                {editMode ? <Button onClick={showModal}>
                        <PlusOutlined/> Добавить элемент
                    </Button>
                    : <div className={s.totalPrice}>
                        <div></div>
                        {category.totalCategoryPrice
                            ? <div> Итого: {category.totalCategoryPrice}</div>
                            : ""}</div>
                }
            </div>
            <Modal footer={
                <>
                    <Button style={{position: "relative", right: 185}}
                            onClick={() => {
                                handleOk();
                                showModal();
                            }}>Следующий Элемент</Button>
                    <Button onClick={handleCancel}>Cansel</Button>
                    <Button onClick={handleOk}>Ok </Button>
                </>
            } title="Добавить элемент" visible={isModalVisible}>
                <Input placeholder={"Добавить элемент"} value={listItem}
                       onChange={(e) => setListItem(e.target.value)}/>
            </Modal>
        </div>
    );
};




