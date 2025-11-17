import { useState } from 'react';
import axios from 'axios';

export default function AddCardToDeck(props) {
    const [cardFront, setCardFront] = useState('');
    const [cardBack, setCardBack] = useState('');

    const handleCardFrontInput = (e) => {
        setCardFront(e.target.value);
    }

    const handleCardBackInput = (e) => {
        setCardBack(e.target.value);
    }

    let addCard = () => {
        axios
            .post(`/api/flashcards/${props.match.params.deck_id}`, {cardFront, cardBack})
            .then(console.log(cardFront, cardBack), setCardFront(''), setCardBack(''))
            .catch(error => {
                alert(error)
            })
    }

        return (
            <div>
                <h3 className='add-a-card'>Add a card to your deck</h3>
                <h4>{props.match.params.name}</h4>
                <section>
                    <h3>Front:</h3>
                    <input
                        type='text'
                        className='add-card-inputs'
                        placeholder='Card Front'
                        onChange={e => handleCardFrontInput(e)}
                        value={cardFront}
                    ></input>
                </section>
                <section>
                    <h3>Back:</h3>
                    <input
                        type='text'
                        className='add-card-inputs'
                        placeholder='Card Back (Answer)'
                        onChange={e => handleCardBackInput(e)}
                        value={cardBack}
                    ></input>
                </section>
                <button
                className='add-card-button'
                onClick={() => addCard()}
                >Add Card</button>
            </div>
        )
};