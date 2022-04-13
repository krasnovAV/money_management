import React from 'react';
// @ts-ignore
import s from "./App.module.css"
import {Button, Layout, Menu} from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import {NavLink, Route, Routes} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Income} from "./components/Income/Income";
import {Expenses} from "./components/Expenses/Expenses";
import {ShoppingList} from "./components/ShoppingList/ShoppingList";
import {Login} from './components/Login/Login';
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {logoutAC} from "./Store/Redusers/authReducer";
import {shoppingListActions} from "./Store/Redusers/shoppingListReducer";


const App = () => {
    const {isAuth} = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutAC());
        dispatch(shoppingListActions.setDefaultState());
    }

    return (
        <Layout className={s.wrapper}>
            <Header className={s.layoutHeader} style={{background: "white"}}>
                <div>Money Management</div>
                {isAuth ? <Button style={{marginTop: "12px"}}
                                  size={"large"}
                                  onClick={logout}
                    >Logout</Button>
                    : <NavLink to={"/login"}> Login </NavLink>
                }
            </Header>
            <Layout className={s.wrapper}>
                <Sider theme="light">
                    <Menu className={s.navbar} theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        {isAuth ? <>
                                <Menu.Item className={s.menuItem} key="1">
                                    <NavLink to={"/income"}> Доходы </NavLink>
                                </Menu.Item>
                                <Menu.Item className={s.menuItem} key="2">
                                    <NavLink to={"/expenses"}> Расходы </NavLink>
                                </Menu.Item>
                            </>
                            : <></>
                        }

                        <Menu.Item className={s.menuItem} key="3">
                            <NavLink to={"/shoppingList"}> Список покупок </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content className={s.layoutContent}>
                    <Routes>
                        <Route path="/income" element={<Income/>}/>
                        <Route path="/expenses" element={<Expenses/>}/>
                        <Route path="/shoppingList" element={<ShoppingList/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </Content>
            </Layout>
            <Footer style={{background: "white"}} className={s.layoutBase}>Footer</Footer>
        </Layout>
    );
}

export default App;