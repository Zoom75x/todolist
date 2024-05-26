import css from "./Star.module.css"
import {RatingType} from "../../Rating.tsx";
interface Props{
    isSelected:boolean
    onClick:(id:number) => void
    id:RatingType
}

export const Star = ({isSelected, onClick, id}:Props) => {
    return (
        <li>
            <span className={isSelected ? css.isSelected : ""} onClick={() =>{
                onClick(id)
            }}>Star</span>
        </li>
    )
}