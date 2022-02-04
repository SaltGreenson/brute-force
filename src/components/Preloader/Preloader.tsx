import React from "react"
import preloader from "./Squares wave.gif"
import classes from "./Preloader.module.css"

export const Preloader: React.FC = () => {
    return <div className={classes.preloader}>
        <img src={preloader}/>
    </div>
}