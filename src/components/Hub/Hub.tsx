import './Hub.css'
import "../../utils/stopwatch"
import { timeFormat } from '../../utils/stopwatch'
export type Stats = {
    moves:  number
    time: number
    bestTime: number
}

function Hub({stats} : {stats: Stats}){
    return(
        <div className="stats">
            <div className="box moves">Moves: {stats.moves}</div>
            <div className="box time">Time: {timeFormat(stats.time)}</div>
            <div className="box best-time">Best Time: {timeFormat(stats.bestTime)}</div>
        </div>
    )
}

export default Hub;