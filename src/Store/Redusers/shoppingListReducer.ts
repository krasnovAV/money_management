import {InferActionsTypes} from "./rootReducer";
import {Dispatch} from "redux";
import {categoriesAPI} from "../../API/categoriesAPI";
import {expensesApi} from "../../API/expensesAPI";

export type CategoryType = {
    title: string;
    totalCategoryPrice: number;
}

export interface IShoppingList {
    categories: string[];
    selectedCategories: CategoryType[];
    totalPrice: number;
}

const initialState: IShoppingList = {
    categories: ["Продукты", "Счета", "Одежда", "Авто"],
    selectedCategories: [],
    totalPrice: 0,
}

type ActionTypes = InferActionsTypes<typeof shoppingListActions>
export const shoppingListActions = {
    addCategory: (title: string) => (
        {type: "ADD_CATEGORY", payload: title} as const),
    deleteCategory: (title: string) => ({type: "DELETE_CATEGORY", payload: title} as const),
    setSavedCategories: (categories: Array<string>) => ({type: "SET_SAVED_CATEGORIES", payload: categories} as const),
    selectCategory: (title: string) => ({type: "SELECT_CATEGORY", payload: title} as const),
    deleteSelectedCategory: (category: CategoryType) => ({
        type: "DELETE_SELECTED_CATEGORY",
        payload: category
    } as const),
    deleteAllSelectedCategories: () => ({type: "DELETE_ALL_SELECTED_CATEGORY"} as const),
    deleteAllCategories: () => ({type: "DELETE_ALL_CATEGORY"} as const),
    changeTotalCategoryPrice: (title: string, price: number) => ({
        type: "CHANGE_TOTAL_CATEGORY_PRICE",
        payload: {title, price}
    } as const),
    addToTotalPrice: (price: number) => ({type: "ADD_TO_TOTAL_PRICE", payload: price} as const),
    subtractFromTotalPrice: (price: number) => ({type: "SUBTRACT_FROM_TOTAL_PRICE", payload: price} as const),
    resetTotalPrice: () => ({type: "RESET_TOTAL_PRICE"} as const),
    setDefaultState: () => ({type: "SET_DEFAULT_STATE"} as const),
}


export const ShoppingListReducer = (state = initialState, action: ActionTypes): IShoppingList => {
    switch (action.type) {
        case "ADD_CATEGORY":
            return {...state, categories: [...state.categories, action.payload]}
        case "SET_SAVED_CATEGORIES":
            return {...state, categories: action.payload}
        case "DELETE_CATEGORY":
            return {...state, categories: state.categories.filter(category => category !== action.payload)}
        case "DELETE_ALL_CATEGORY":
            return {...state, categories: []}
        case "SELECT_CATEGORY":
            return {
                ...state,
                selectedCategories: [...state.selectedCategories, {title: action.payload, totalCategoryPrice: 0}]
            }
        case "DELETE_ALL_SELECTED_CATEGORY":
            return {...state, selectedCategories: []}
        case "DELETE_SELECTED_CATEGORY":
            return {
                ...state,
                selectedCategories: state.selectedCategories.filter(category => category !== action.payload)
            }
        case "CHANGE_TOTAL_CATEGORY_PRICE":
            let temp: CategoryType = {
                title: action.payload.title,
                totalCategoryPrice: action.payload.price
            }
            return {
                ...state, selectedCategories: state.selectedCategories.map(
                    category => category.title === action.payload.title ? temp : category)
            }
        case "ADD_TO_TOTAL_PRICE":
            return {...state, totalPrice: state.totalPrice + action.payload}
        case "SUBTRACT_FROM_TOTAL_PRICE":
            return {...state, totalPrice: +(state.totalPrice - action.payload).toFixed(2)}
        case "RESET_TOTAL_PRICE":
            return {...state, totalPrice: 0}
        case "SET_DEFAULT_STATE":
            return {...initialState}
        default:
            return state;
    }
}

export const getSavedCategories = (id: string) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        const response = await categoriesAPI.getSavedCategories(id)
        if (!response.data.length) {
            await categoriesAPI.setDefaultSavedCategories(id, initialState.categories);
        } else {
            dispatch(shoppingListActions.setSavedCategories(response.data[0].categories))
        }
    } catch (e: any) {
        alert("Ошибка получения списка категорий ")
    }
}

export const updateSavedCategories = (userId: string, categories: string[] = initialState.categories) => async () => {
    try {
        if (initialState.categories !== categories) {
            await categoriesAPI.updateSavedCategories(userId, categories);
        }
    } catch (e: any) {
        alert("Ошибка обновления списка категорий ")
    }
}

export const addExpensesListToStatistics = (userId: string, expensesForCategories: CategoryType[],
                                            totalPrice: number) => async (dispatch: Dispatch<ActionTypes>) => {
    const date = new Date();
    //const currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    await expensesApi.addExpensesList(userId, expensesForCategories, totalPrice, date).then(console.log)
    dispatch(shoppingListActions.resetTotalPrice())
    dispatch(shoppingListActions.deleteAllSelectedCategories())
}

