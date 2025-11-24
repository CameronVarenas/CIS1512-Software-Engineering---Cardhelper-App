import { Component } from 'react'
import axios from 'axios';

class Flashcard extends Component {
    constructor() {
        super();
        this.state = {
            showAnswer: false,
            flashcardData: [],
            currentCard: 0,
            currentCardFront: '',
            currentCardBack: ''
        }
    }

    componentDidMount() {
        this.getAllFlashcards();
    }

    getAllFlashcards() {
        axios
            .get(`api/flashcards/${this.props.match.params.deck_id}`)
            .then(res => {
                this.setState({flashcardData: res.data});
                this.setState({currentCardFront: res.data[this.state.currentCard].card_front});
                this.setState({currentCardBack: res.data[this.state.currentCard].card_back});
            })
            .catch(error => {
                alert(error);
            })
    }

    nextCard() {
        this.setState({showAnswer: false});
        this.state.currentCard === this.state.flashcardData.length - 1 ? 
        this.setState({currentCard: 0}) :
        this.setState({currentCard: ++this.state.currentCard});
        this.setState({currentCardFront: this.state.flashcardData[this.state.currentCard].card_front});
        this.setState({currentCardBack: this.state.flashcardData[this.state.currentCard].card_back});
    }

    previousCard() {
        this.setState({showAnswer: false});
        this.state.currentCard === 0 ? 
        this.setState({currentCard: this.state.flashcardData.length - 1}) :
        this.setState({currentCard: --this.state.currentCard});
        this.setState({currentCardFront: this.state.flashcardData[this.state.currentCard].card_front});
        this.setState({currentCardBack: this.state.flashcardData[this.state.currentCard].card_back});
    }

    render() {
        const showAnswer = this.state.showAnswer;
        return (
            <div className='flashcard'>
                <section>
                    <p>{this.state.currentCardFront}</p>
                </section>
                <button
                    className='flashcard-buttons'
                    onClick={() => {
                        this.state.showAnswer === false ?
                        this.setState({showAnswer: true}) :
                        this.setState({showAnswer: false})
                    }}
                >Show Answer</button>
                <p className='flashcard'>-------------------------------------------------------</p>       
                <button
                    className='flashcard-buttons'
                    onClick={() => this.previousCard()}
                >Previous</button>
                <button
                    className='flashcard-buttons'
                    onClick={() => this.nextCard()}
                >Next</button>
                <section className='flashcard'>
                    {showAnswer ? <p>{this.state.currentCardBack}</p> : null}
                </section>
            </div>
        )
    }
}

export default Flashcard;