import {Star} from "./components/star/Star.tsx";
import {useState} from "react";
export type RatingType = 0 | 1 | 2 | 3 | 4 | 5
export const Rating = () => {
    const [rating, setRating] = useState<RatingType>(0)
    const onClick = (id: RatingType) => {
        setRating(id)
    }
    const getStar = (count: RatingType) => {
        const stars: RatingType[] = []
        for (let i = 0; i < count; i++)
            stars.push(i as RatingType)
    return stars
}
    return (
        <ul>
            {getStar(5).map((el, index) => <Star key={index} isSelected={rating>el} onClick={onClick} id={(el+1) as RatingType}/>)}
        </ul>
    )
            }