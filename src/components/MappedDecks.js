import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MappedDecks(props) {
    const [deckNewName, setDeckNewName] = useState('');
    const [showRename, setShowRename] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDeckNewNameInput = (e) => {
        setDeckNewName(e.target.value);
    }

    const toggleRename = () => {
        setShowRename(!showRename);
        setShowDeleteConfirm(false);
    }

    const toggleDeleteConfirm = () => {
        setShowDeleteConfirm(!showDeleteConfirm);
        setShowRename(false);
    }

    return (
        <div>
            <section id='deck-options-bar'>
                <h4 id='deck-name'>{props.deck.name}</h4>
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
                    onClick={toggleRename}
                >Rename Deck</button>

                <button
                    className='deck-options'
                    onClick={toggleDeleteConfirm}
                >Delete Deck</button>
            </section>

            <section>
                {showRename && (
                    <div className="rename-section">
                        <input
                            type='text'
                            placeholder='Enter a new deck name'
                            onChange={handleDeckNewNameInput}
                            value={deckNewName}/>
                        <button
                            onClick={() => {
                                props.renameDeck(props.deck.deck_id, deckNewName);
                                setDeckNewName('');
                                setShowRename(false);
                                }}>
                            Save Name
                        </button>
                    </div>
                )}

                {showDeleteConfirm && (
                    <div className="delete-confirm-section">
                        <p>Are you sure you want to delete this deck?</p>
                        <button
                            className="delete-button"
                            onClick={() => props.deleteDeck(props.deck.deck_id)}>
                            Delete Deck
                        </button>
                    </div>
                )}
            </section>

        </div>
    );
}