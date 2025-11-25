import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MappedDecks from './MappedDecks';

class UserDecks extends Component {
    constructor() {
        super();
        this.state = {
            deckName: '',
            userDecks: []
        }
        this.deleteDeck = this.deleteDeck.bind(this);
        this.renameDeck = this.renameDeck.bind(this);
    }

    componentDidMount() {
        if (!this.props.user) {
            return this.props.history.push('/')
        }
        this.getDecks();
    }

    handleDeckNameInput(e) {
        this.setState({ deckName: e.target.value });
    }

    getDecks() {
        axios
            .get('/api/decks/')
            .then((res) => {
                this.setState({ userDecks: res.data });
            })
            .catch(error => {
                alert(error)
            })
    }

    createDeck() {
        const { deckName } = this.state
        axios
            .post('/api/decks/', { deckName })
            .then(() => {
                this.setState({ deckName: '' });
                this.getDecks();
            })
            .catch((error) => {
                alert(error.response.request.response)
            })
    }

    renameDeck(deck_id, deckNewName) {
        axios
            .put(`/api/decks/${deck_id}`, { deckNewName })
            .then(() => this.getDecks())
            .catch((error) => {
                console.log(this)
                alert(error)
            })
    }

    deleteDeck(deck_id) {
        axios
            .delete(`/api/decks/${deck_id}`)
            .then(() => this.getDecks())
            .catch((error) => {
                alert(error.response.request.response)
            })
    }

    render() {
        const decksMapped = this.state.userDecks.map(deck => {
            return (
                <MappedDecks
                    key={deck.deck_id}
                    deck={deck}
                    deleteDeck={this.deleteDeck}
                    renameDeck={this.renameDeck}
                />
            );
        });

        return (
            <div>
                <section>
                    <h3>Your Decks</h3>
                </section>

                <section>
                    <input
                        className='user-decks-inputs'
                        type='text'
                        placeholder='Enter deck name'
                        onChange={e => this.handleDeckNameInput(e)}
                        value={this.state.deckName}/>
                    <button
                        className='user-decks-inputs'
                        onClick={() => this.createDeck()}>
                        Create New Deck
                    </button>
                </section>

                <section className="decks-scroll-container">
                    {decksMapped}
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(UserDecks)