import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import './App.css';
import {Menu} from "./components/Menu/Menu";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from './redux/redux-store';
import {initializeApp} from "./redux/app-reducer";
import Header from "./components/Header/Header";
import {getInitialized} from "./components/selectors/selectors";
import {Preloader} from "./components/Preloader/Preloader";

const App: React.FC = () => {

    // получение данных инициализации из стейта
    const initialized = useSelector(getInitialized)

    // переменная типа диспатч
    const dispatch = useDispatch()

    // функция которая вызыватеся во время отрисовки компоненты
    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    // проверка на инициализацию
    if (!initialized) {
        return <Preloader/>
    }

    // отрисовка компоненты
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' render={() => <Redirect to="/generation"/>}/>
                <Route exact path='/generation' render={() => <Menu/>}/>
                <Route exact path='*' render={() => (<div><h1>404 NOT FOUND</h1></div>)}/>
            </Switch>
        </div>
    );
}

// компонента
export const MainApp: React.FC = () => {
    // отрисовка компоненты
    return <BrowserRouter>
        <Provider store={store}>
        <App/>
    </Provider>
</BrowserRouter>
}
