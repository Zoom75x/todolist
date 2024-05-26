import './App.css'
import {Rating} from "./feature/rating/Rating.tsx";
import {Counter} from "./feature/counter";


export const App = () => {

    return (
            <div>
          <h2>Рейтинг</h2>
          <Rating/>
          <h2>Счетчик</h2>
            <Counter/>
            </div>
  )
}
