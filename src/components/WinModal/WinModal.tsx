import { timeFormat } from "../../utils/stopwatch";
import type { Stats } from "../Hub/Hub";
import "./WinModal.css";

function WinModal({restart, stats} : {restart: () => void, stats: Stats}) {
    return(
        <div className="win-modal">
            <div className="win-text">
                <h1>Y O U  W O N !</h1>
                <div>Your Time: {timeFormat(stats.time)}</div>
                <button className="win-button" onClick={restart}>Restart</button>
            </div>
            
        </div>
    )
}

export default WinModal;