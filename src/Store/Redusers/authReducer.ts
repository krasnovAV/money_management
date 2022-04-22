import {InferActionsTypes} from "./rootReducer";
import {Dispatch} from "redux";
import {authAPI} from "../../API/authAPI";

interface IAuthState {
    userId: string | null;
    email: string | null;
    isAuth: boolean;
    isFetching: boolean;
}

const initialState: IAuthState = {
    userId: null,
    email: null,
    isAuth: false,
    isFetching: false,
}

export const authReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "auth/SET_AUTH_USER_DATA":
            return {
                ...state, userId: action.payload.userId,
                email: action.payload.email,
                isAuth: action.payload.isAuth,
            }
        case "auth/TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.payload}
        default:
            return state;
    }
}

type ActionTypes = InferActionsTypes<typeof authActions>;
export const authActions = {
    setAuthUserData: (userId: string | null, email: string | null, isAuth: boolean) => (
        {type: "auth/SET_AUTH_USER_DATA", payload: {userId, email, isAuth}} as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: "auth/TOGGLE_IS_FETCHING", payload: isFetching
    } as const),
}

export const loginAC = (email: string, password: string) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        dispatch(authActions.toggleIsFetching(true));
        let response = await authAPI.login(email, password);
        dispatch(authActions.setAuthUserData(response.data[0].id, response.data[0].email, true))
        dispatch(authActions.toggleIsFetching(false));
    } catch (e: any) {
        dispatch(authActions.toggleIsFetching(false));
        //alert(e.code);
        alert("Неправильный email или пароль!")
    }
}

export const registerAC = (email: string, password: string) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        dispatch(authActions.toggleIsFetching(true));
        const responseCheck = await authAPI.login(email, password);
        if (responseCheck.data.length) {
            alert("Такой пользователь уже Существует!");
            dispatch(authActions.toggleIsFetching(false));
        } else {
            const response = await authAPI.register(email, password);
            dispatch(authActions.setAuthUserData(response.data.id, response.data.email, true))
            //debugger
            //const res = await setDefaultSavedCategories(response.data.id)
            dispatch(authActions.toggleIsFetching(false));

        }
    } catch (e: any) {
        dispatch(authActions.toggleIsFetching(false));
        alert(e.code);
    }
}

export const logoutAC = () => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(authActions.setAuthUserData(null, null, false))
}
