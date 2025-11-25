import { Component } from 'react';
import axios from 'axios';

class Flashcard extends Component {
    constructor() {
        super();
        this.state = {
            showAnswer: false,
            flashcardData: [],
            currentCard: 0,
            finished: false
        };
    }

    componentDidMount() {
        this.getAllFlashcards();
    }

    getAllFlashcards() {
        axios
            .get(`/api/flashcards/${this.props.match.params.deck_id}`)
            .then(res => {
                const cards = res.data || [];
                this.setState({
                    flashcardData: cards,
                    currentCard: 0,
                    showAnswer: false,
                    finished: cards.length === 0
                });
            })
            .catch(error => {
                alert(error);
            });
    }

    nextCard = () => {
        this.setState(prevState => {
            const nextIndex = prevState.currentCard + 1;

            if (nextIndex >= prevState.flashcardData.length) {
                return {
                    finished: true,
                    showAnswer: false
                };
            }

            return {
                currentCard: nextIndex,
                showAnswer: false
            };
        });
    };

    toggleAnswer = () => {
        this.setState(prevState => ({
            showAnswer: !prevState.showAnswer
        }));
    };

    restart = () => {
        this.setState({
            currentCard: 0,
            showAnswer: false,
            finished: false
        });
    };

    render() {
        const { flashcardData, currentCard, showAnswer, finished } = this.state;

        if (finished) {
            return (
                <div className="flashcard">
                    <h2>Study session complete!</h2>
                    <button className="flashcard-buttons" onClick={this.restart}>
                        Study Again
                    </button>
                </div>
            );
        }

        if (flashcardData.length === 0) {
            return <div className="flashcard">Loading flashcards...</div>;
        }

        const current = flashcardData[currentCard];

        return (
            <div className="flashcard">
                <section>
                    <p>{current.card_front}</p>
                    <p>Card {currentCard + 1} of {flashcardData.length}</p>
                </section>
                <p className="flashcard divider">-------------------------------------------------------</p>
                <section className="flashcard back-container">
                    {showAnswer ? (
                        <p className="back-text">{current.card_back}</p>
                    ) : (
                        <p className="back-placeholder">&nbsp;</p>)}
                </section>
                <button
                    className="flashcard-buttons bottom-button"
                    onClick={() => {
                        if (!showAnswer) {
                            this.toggleAnswer();
                        } else {
                            this.nextCard();
                        }
                    }}>
                    {showAnswer ? "Next Card" : "Show Answer"}
                </button>
            </div>
        );
    }
}

export default Flashcard;