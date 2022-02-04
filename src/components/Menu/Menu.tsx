import React from "react"

import {MenuForm} from "./MenuForm";
import {useSelector} from "react-redux";
import {getLoading} from "../selectors/selectors";
import {Preloader} from "../Preloader/Preloader";

// компонента
export const Menu: React.FC = () => {

    // получение загрузки из стейта
    const loading = useSelector(getLoading)

    // отрисовка компоненты
    return <div>
        {loading ? <Preloader/> : null}
        <MenuForm/>
    </div>
}