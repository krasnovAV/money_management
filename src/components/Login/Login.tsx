import React, {useState} from 'react';
// @ts-ignore
import s from "./Login.module.css"
import {LoginForm} from "./LoginForm";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Radio} from 'antd';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginAC, registerAC} from '../../Store/Redusers/authReducer';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isFetching, isAuth} = useTypedSelector(state => state.auth);

    const options = [
        {label: 'Войти', value: 'Login'},
        {label: 'Зарегистрироваться', value: 'Register'},
    ];
    const [loginOrRegister, setLoginOrRegister] = useState('Login')
    const [isNewUser, setIsNewUser] = useState(false)

    const register = async (email: string, password: string) => {
        dispatch(registerAC(email, password))
    }

    const login = (email: string, password: string) => {
        dispatch(loginAC(email, password));
    }

    if (isAuth) {
        navigate("/shoppingList")
    }

    if (isFetching) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className={s.wrapper}>
            <div className={s.body}>
                <div className={s.radioGroup}>
                    <Radio.Group
                        options={options}
                        onChange={(e) => {
                            setLoginOrRegister(e.target.value);
                            setIsNewUser(!isNewUser);
                        }}
                        value={loginOrRegister}
                        optionType="button"
                    />
                </div>
                <div>
                    {isNewUser ? <LoginForm title={'Зарегистрироваться'} submit={register}/>
                        : <LoginForm title={'Войти'} submit={login}/>}
                </div>
            </div>
        </div>
    )
}


