import React from "react"
import "./ProgressBar.css"
import {useSelector} from "react-redux";
import {getProcessingBarPosition} from "../selectors/selectors";



export const ProgressBar = () => {
    return <div>
        <div id="myProgress">
            <div id="myBar"></div>
        </div>
    </div>
}