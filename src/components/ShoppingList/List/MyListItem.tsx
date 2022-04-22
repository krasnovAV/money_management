import React, {FC, useState} from "react";
// @ts-ignore
import s from "./List.module.css";
import {Button, Modal, InputNumber} from "antd";

type PT = {
    listItem: string;
    editMode: boolean
    deleteListItem: (listItem: string, price: number) => void;
    addToTotalCategoryPrice: (price: number) => void;
    subtractFromTotalCategoryPrice: (price: number) => void;
}

export const MyListItem: FC<PT> = ({
                                       listItem, editMode, deleteListItem,
                                       addToTotalCategoryPrice, subtractFromTotalCategoryPrice
                                   }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [price, setPrice] = useState<number>(0);
    const [isDone, setIsDone] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const toggleIsDone = () => {
        if (!editMode) {
            if (isDone) {
                setIsDone(false);
                subtractFromTotalCategoryPrice(price)
                setPrice(0);
            } else {
                showModal()
            }
        }
    }

    const handleOk = () => {
        setIsModalVisible(false);
        setIsDone(true);
        addToTotalCategoryPrice(price);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div className={s.listItemBody}>
                <div className={s.listItem}>
                    <div onClick={toggleIsDone}
                         className={isDone ? s.done : null}>{listItem}</div>
                    <div>{price > 0 ? price : ""}</div>
                </div>
                <Modal title="Стоимость" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <InputNumber placeholder={"Стоимость"} value={price} size={"large"} style={{width: 200}}
                                 onChange={(value) => setPrice(value)}/>
                </Modal>
                {
                    editMode ? <Button onClick={() => deleteListItem(listItem, price)}>Удалить</Button>
                        : ""
                }
            </div>
            <hr/>
        </div>
    )
}