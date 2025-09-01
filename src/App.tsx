import { useEffect, useState } from 'react'
import { buildDeck } from './utils/deck'
import './App.css'
import type { CardInterface } from './utils/deck';
import Card from './components/Card/Card';
import Hub from './components/Hub/Hub';
import type { Stats } from './components/Hub/Hub';
import WinModal from './components/WinModal/WinModal';


function App() {
  const [, setMoves] = useState(0);
  const [deck, setDeck] = useState<CardInterface[]>([]);
  const [firstIndex, setFirstIndex] = useState(-1);
  const [stats, setStats] = useState<Stats>({ moves: 0, time: 0, bestTime: Number(localStorage.getItem('bestTime')) })
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWon, setIsWon] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  // const cardTest: CardInterface ={
  //   id: 0,
  //   emoji: '🍌',
  //   flipped: false,
  //   matched: false,
  //   onclick: () => {}
  // }
  // const statsTest: Stats = {
  //   moves: 10,
  //   time: 60,
  //   bestTime: 30
  // }
  useEffect(() => {
    setDeck(buildDeck());
    localStorage.getItem('bestTime')
    console.log("Deck was created", deck);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(id); // cleanup
  }, [isRunning]);

  useEffect(() => {
    setStats(s => ({ ...s, time: seconds }));

  }, [seconds]);

  useEffect(() => {
    if (!deck.length) return;
    const won = deck.every(c => c.matched);
    if (won) {
      setIsWon(true);
      if (localStorage.getItem('bestTime') === null || Number(localStorage.getItem('bestTime')) > stats.time)
        localStorage.setItem('bestTime', stats.time.toString())

      setIsRunning(false); // stop stopwatch
    }
  }, [deck]);

  const flipCard = (index: number) => {
    setIsRunning(true);

    if (deck[index].matched || index === firstIndex || isLocked)
      return;

    const newStats: Stats = {
      moves: stats.moves + 1,
      time: seconds,
      bestTime: stats.bestTime
    }
    setStats(newStats);
    const newDeck = deck.map((c, i) =>
      i === index ? { ...c, flipped: true } : c
    );
    setDeck(newDeck);

    if (firstIndex === -1) {
      setFirstIndex(index);
      return;
    } else {
      setIsLocked(true);
      const a = firstIndex;
      const b = index;

      const isMatch = newDeck[a].emoji === newDeck[b].emoji;
      if (isMatch) {
        setDeck(prev =>
          prev.map((c, i) =>
            i === a || i === b ? { ...c, matched: true } : c
          )
        );
        setIsLocked(false);
        setFirstIndex(-1);

      } else {
        setFirstIndex(-1);
        setTimeout(() => {
          setDeck(prev =>
            prev.map((c, i) =>
              i === a || i === b ? { ...c, flipped: false } : c
            )
          );
          setFirstIndex(-1);
          setIsLocked(false);
        }, 700);

      }

    }

  }

  const restart = () => {
    console.log('Restart pressed')
    setIsWon(false);
    setDeck(buildDeck);
    setIsRunning(false);
    setFirstIndex(-1);
    setMoves(0);
    setSeconds(0);
    setStats({ moves: 0, time: 0, bestTime: Number(localStorage.getItem('bestTime')) });
  }



  return (
    <div className='main-container'>
      <div className='main-header'>
        <h1 className='main-text'>Memory Game</h1>
      </div>
      <Hub stats={stats} />
      <div className='playfield'>
        {deck.map((card, index) => (

          <Card
            key={card.id}
            card={card}
            onclick={() => flipCard(index)}
          />
        ))}
      </div>
      <div className='restart-button' onClick={restart}>
        Restart
      </div>
      {isWon ? <WinModal restart={restart} /> : null}
    </div>

  )
}

export default App


