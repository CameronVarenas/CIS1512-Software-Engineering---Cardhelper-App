import { Routes, Route } from 'react-router-dom';
import { Landing, Auth, UserDecks, Flashcard, AddCardsToDeck, CardList } from './components';

export default (
    <Routes>
        <Route exact path='/' component={Landing} />
        <Route path='/auth' component={Auth} />
        <Route exact path='/user-decks' component={UserDecks} />
        <Route exact path='/flashcard/:deckId' component={Flashcard} />
        <Route exact path='/add-card/:deckId' component={AddCardsToDeck} />
        <Route exact path='/card-list/:deckId' component={CardList} />
    </Routes>
)