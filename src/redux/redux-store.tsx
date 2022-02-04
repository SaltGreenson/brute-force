import {Action, applyMiddleware, combineReducers, createStore, compose} from "redux"
import {appReducer} from "./app-reducer";
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import {menuReducer} from "./menu-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    menuPage: menuReducer
})
export type InferActionsTypes<T> = T extends {[keys: string] : (...args: any[]) => infer U} ? U : never
export  type AppStateType = ReturnType<typeof rootReducer>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))

export type GenericThunkType<AT extends Action, R = void> = ThunkAction<R, AppStateType, unknown, AT>