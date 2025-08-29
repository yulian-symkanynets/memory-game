import "./WinModal.css";

function WinModal({restart} : {restart: () => void}) {
    return(
        <div className="win-modal">
            <div className="win-text">
                <h1>Y O U  W O N !</h1>
                <div>Your Time</div>
                <button className="win-button" onClick={restart}>Restart</button>
            </div>
            
        </div>
    )
}

export default WinModal;