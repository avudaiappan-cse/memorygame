const Card = ({card, index, isRevealed, updateRevealed}) => {
    const cardBackSrc = 'assets/back.jpg';

    const handleClick = () => updateRevealed(index);

    return (
        <div className={`card ${isRevealed ? 'is-revealed' : ''}`}>
              <div className='card__face card__face--front'>
                <img src={card.src} alt={card.src} />
              </div>
              <div className='card__face card__face--back'>
                <img src={cardBackSrc} alt={card.src} onClick={handleClick} />
              </div>
        </div>
    );
};

export default Card;