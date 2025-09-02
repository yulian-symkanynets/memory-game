import './Hub.css'
import "../../utils/stopwatch"
import { timeFormat } from '../../utils/stopwatch'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
export type Stats = {
    moves: number
    time: number
    bestTime: number
}

function Hub({ stats }: { stats: Stats }) {
    return (
        <div className='hud'>
            
            <div className="stats">
                <div className="box moves">Moves: {stats.moves}</div>
                <div className="box time">Time: {timeFormat(stats.time)}</div>
                <div className="box best-time">Best Time: {timeFormat(stats.bestTime)}</div>
            </div>
            <ThemeToggle />
        </div>
    )
}

export default Hub;