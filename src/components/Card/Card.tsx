import type { CardInterface } from '../../utils/deck';
import "./Card.css";

export default function Card({ card, onclick }: { card: CardInterface; onclick: () => void }) {
  return (
    <div className={`card ${card.flipped ? "flipped" : ""}`} onClick={onclick}>
      <div className="card-inner">
        <div className="card-face card-front"></div>
        <div className={`card-face card-back ${card.matched ? "matched" : ""}`}>{card.emoji}</div>
      </div>
    </div>
  );
}
