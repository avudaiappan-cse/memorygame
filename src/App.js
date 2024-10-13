import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

function App() {

  const [ cards, setCards ] = useState([]);

  const [ firstCard, setFirstCard ] = useState();
  const [ secondCard, setSecondCard ] = useState();
  const [ disabled, setDisabled ] = useState(false);
  const [turn, setTurn] = useState(0);

  const initGame = () => {
    const cards = 
    new Array(16).fill().map((_, i) => ({
      src : `assets/0${i % 8  + 1}.jpg`,
      revealed : false
    }))
    .sort(() => Math.random() - .5);

    if(firstCard) {
      setFirstCard();
    } 

    setTimeout(() => setCards(cards), 300);
    setTurn(0);
  }

  const updateRevealedCards = index => {
    if(disabled) {
      return;
    }

    setTurn(turn + 1);

    if(firstCard !== undefined) {
      setSecondCard(index);
    } else {
      setFirstCard(index);
    }
  };

  const reset = () => {
    setFirstCard();
    setSecondCard();
    setDisabled(false);
  }

  useEffect(() => {
    if(firstCard !== undefined && secondCard !== undefined) {
      setDisabled(true);
      if(cards[firstCard].src === cards[secondCard].src) {
        const updatedCards = cards.map((card, i) => ({
          ...card,
          revealed : card.revealed || i === firstCard || i === secondCard
        }));

        setCards(updatedCards);
        reset();
      } else {
        setTimeout(reset, 1000);
      }
    }
  }, [ firstCard, secondCard ])

  useEffect(() => initGame(), [])

  return (
    <div className="App">
      <div className='grid'>
        {
          cards.map((card, i) => 
          <Card 
            card={card} 
            index={i} 
            key={i} 
            isRevealed={card.revealed || i === firstCard || i === secondCard}
            updateRevealed={updateRevealedCards}
          />
          )
        }
      </div>
      <div className='controls'>
        <p>Turn: {turn}</p>
        <button onClick={initGame}>New Game</button>
      </div>
    </div>
  );
}

export default App;
