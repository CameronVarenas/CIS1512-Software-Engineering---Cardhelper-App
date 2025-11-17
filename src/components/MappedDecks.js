import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MappedDecks(props) {
    const [deckNewName, setDeckNewName] = useState('');

    const handleDeckNewNameInput = (e) => {
        setDeckNewName(e.target.value);
    }
    
    return (
        <section id='deck-display'>
            <div>
                <h4>{props.deck.name}</h4>
            </div>
            <div>
                <Link
                    to={`/flashcard/${props.deck.deck_id}`}
                    className='deck-options'
                >Study</Link>
                <Link
                    to={`/add-card/${props.deck.deck_id}`}
                    className='deck-options'
                >Add Card</Link>
                <Link
                    to={`/card-list/${props.deck.deck_id}`}
                    className='deck-options'
                >View Cards</Link>
                <button
                    className='deck-options'
                    onClick={() => props.renameDeck(props.deck.deck_id, deckNewName)}
                >Rename Deck</button>
                <button
                    className='deck-options'
                    onClick={() => props.deleteDeck(props.deck.deck_id)}
                >Delete Deck</button>
            </div>
            <input
                type='text'
                placeholder='Enter a new name'
                onChange={e => handleDeckNewNameInput(e)}
                value={deckNewName}
            ></input>
        </section>
    )
};