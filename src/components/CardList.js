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
            card_id: null,
            showEditSection: false,
            showDeleteSection: false,
            delete_card_id: null
        };
        this.getCardIdToEdit = this.getCardIdToEdit.bind(this);
        this.openDeleteCardConfirm = this.openDeleteCardConfirm.bind(this);
        this.deleteFlashcard = this.deleteFlashcard.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
    }

    componentDidMount() {
        this.getAllFlashcards();
        this.getCardAmount();
    }

    handleCardFrontInput(e) {
        this.setState({ card_front: e.target.value });
    }

    handleCardBackInput(e) {
        this.setState({ card_back: e.target.value });
    }

    getAllFlashcards() {
        axios
            .get(`api/flashcards/${this.props.match.params.deck_id}`)
            .then(res => {
                this.setState({ flashcardData: res.data });
            })
            .catch(error => {
                alert(error);
            });
    }

    getCardAmount() {
        axios
            .get(`api/card-amount/${this.props.match.params.deck_id}`)
            .then(res => {
                this.setState({ deckInfo: res.data });
            })
            .catch(error => {
                alert(error);
            });
    }

    getCardIdToEdit(card) {
        const { card_id, showEditSection } = this.state;

        if (showEditSection && card_id === card.card_id) {
            this.setState({
                showEditSection: false
            });
            return;
        }

        this.setState({
            card_id: card.card_id,
            card_front: card.card_front,
            card_back: card.card_back,
            showEditSection: true,
            showDeleteSection: false,
            delete_card_id: null
        });
    }

    updateFlashcard() {
        const { card_front, card_back, card_id } = this.state;
        axios
            .put(`api/flashcards/${card_id}`, { card_front, card_back })
            .then(() => {
                this.getAllFlashcards();
                this.setState({ card_front: '', card_back: '' });
            })
            .catch(error => {
                alert(error);
            });
    }

    openDeleteCardConfirm(card_id) {
        const { delete_card_id, showDeleteSection } = this.state;

        if (showDeleteSection && delete_card_id === card_id) {
            this.setState({
                showDeleteSection: false,
                delete_card_id: null
            });
            return;
        }

        this.setState({
            showDeleteSection: true,
            delete_card_id: card_id,
            showEditSection: false
        });
    }

    deleteFlashcard() {
        const { delete_card_id, card_id } = this.state;
        const idToDelete = delete_card_id || card_id;

        if (!idToDelete) return;

        axios
            .delete(`/api/flashcards/${idToDelete}`)
            .then(() => {
                this.getAllFlashcards();
                this.getCardAmount();

                if (card_id === idToDelete) {
                    this.setState({
                        showEditSection: false,
                        card_id: null,
                        card_front: '',
                        card_back: ''
                    });
                }

                this.setState({
                    showDeleteSection: false,
                    delete_card_id: null
                });
            })
            .catch(error => {
                alert(error.response?.request?.response || error);
            });
    }

    cancelDelete() {
        this.setState({
            showDeleteSection: false,
            delete_card_id: null
        });
    }

    render() {
        const cardsMapped = this.state.flashcardData.map(card => {
            return (
                <MappedCards
                    key={card.card_id}
                    card={card}
                    getCardIdToEdit={this.getCardIdToEdit}
                    openDeleteCardConfirm={this.openDeleteCardConfirm}
                />
            );
        });

        const deckInfo = this.state.deckInfo.map(deck => {
            return (
                <h3 key={deck.deck_id}>
                    {deck.name} (Cards: {deck.card_amount})
                </h3>
            );
        });

        return (
            <div>
                <h3 className='card-list-deck-name'>{deckInfo}</h3>

                <section className='mapped-cards-section'>
                    <section className='mapped-cards-headers'>
                        <h5>Front:</h5>
                        <h5 className=''>Back:</h5>
                    </section>
                    {cardsMapped}
                </section>

                {this.state.showEditSection && (
                    <>
                        <h3>Edit Card:</h3>
                        <section>
                            <h4>Front:</h4>
                            <input
                                className='card-list-inputs'
                                placeholder='Card-Front'
                                onChange={e => this.handleCardFrontInput(e)}
                                value={this.state.card_front}
                            />

                            <h4>Back:</h4>
                            <input
                                className='card-list-inputs'
                                placeholder='Card-Back'
                                onChange={e => this.handleCardBackInput(e)}
                                value={this.state.card_back}
                            />
                        </section>

                        <button
                            className='card-list-button'
                            onClick={() => this.updateFlashcard()}
                        >
                            Update Card
                        </button>
                    </>
                )}

                {this.state.showDeleteSection && (
                    <>
                        <h3>Delete Card:</h3>
                        <section>
                            <p>Are you sure you want to delete this card?</p>
                        </section>

                        <button
                            className='card-list-button'
                            onClick={this.deleteFlashcard}
                        >
                            Delete Card
                        </button>
                        <button
                            className='card-list-button'
                            onClick={this.cancelDelete}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        );
    }
}

export default CardList;
