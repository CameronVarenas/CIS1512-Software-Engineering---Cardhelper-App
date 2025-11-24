import { Component } from 'react';
import axios from 'axios';
import MappedCards from './MappedCards';

class CardList extends Component {
    constructor() {
        super();
        this.state = {
            flashcardData: [],
            deckInfo: [],
            card_front: '',
            card_back: '',
            card_id: null
        }
        this.getCardIdToEdit = this.getCardIdToEdit.bind(this);
        this.deleteFlashcard = this.deleteFlashcard.bind(this);
    }

    componentDidMount() {
        this.getAllFlashcards();
        this.getCardAmount();
    }

    handleCardFrontInput(e) {
        this.setState({card_front: e.target.value});
    }

    handleCardBackInput(e) {
        this.setState({card_back: e.target.value});
    }

    getAllFlashcards() {
        axios
            .get(`api/flashcards/${this.props.match.params.deck_id}`)
            .then(res => {
                this.setState({flashcardData: res.data});
            })
            .catch(error => {
                alert(error);
            })
    }

    getCardAmount() {
        axios
            .get(`api/card-amount/${this.props.match.params.deck_id}`)
            .then(res => {
                this.setState({deckInfo: res.data});
            })
            .catch(error => {
                alert(error);
            })
    }

    getCardIdToEdit(card_id) {
        this.setState({card_id: card_id});
    }

    updateFlashcard() {
        const {card_front, card_back, card_id} = this.state;
        axios
            .put(`api/flashcards/${card_id}`, {card_front, card_back})
            .then(() => {
                this.getAllFlashcards();
                this.setState({card_front: '', card_back: ''});
            })
            .catch(error => {
                alert(error)
            })
    }

    deleteFlashcard(card_id) {
        axios
            .delete(`/api/flashcards/${card_id}`)
            .then(() => this.getAllFlashcards(), this.getCardAmount())
            .catch(error => {
                alert(error)
            })
    }

    render() {
        const cardsMapped = this.state.flashcardData.map(card => {
            return <MappedCards
                card={card}
                getCardIdToEdit={this.getCardIdToEdit}
                deleteFlashcard={this.deleteFlashcard}
            />
        })

        const deckInfo = this.state.deckInfo.map(deck => {
            return <h3>{deck.name} (Cards: {deck.card_amount})</h3>
        })

        return (
            <div>
                <h3 className='card-list-deck-name'>{deckInfo}</h3>
                <section className='mapped-cards-section'>
                    <section className='mapped-cards-headers'>
                        <h5>Front:</h5>
                        <h5 className='mapped-cards-back'>Back:</h5>
                    </section>
                    {cardsMapped}
                </section>
                <h3>Edit Card:</h3>
                <section>
                    <h4>Front:</h4>
                    <input
                        className='card-list-inputs'
                        placeholder='Card-Front'
                        onChange={e => this.handleCardFrontInput(e)}
                        value={this.state.card_front}
                    ></input>
                    <h4>Back:</h4>
                    <input
                        className='card-list-inputs'
                        placeholder='Card-Back'
                        onChange={e => this.handleCardBackInput(e)}
                        value={this.state.card_back}
                    ></input>
                </section>
                <button
                    className='card-list-button'
                    onClick={() => {this.updateFlashcard()}}
                >Update Card</button>
            </div>
        )
    }
}

export default CardList;