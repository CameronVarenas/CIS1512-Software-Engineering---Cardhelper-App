module.exports = {
    getUserDecks: async (req, res) => {
        const db = req.app.get('db');
        const result = await db.decks.get_all_users_decks(req.session.user.id);
        return res.status(201).send(result);
    },

    getOneDeck: async (req, res) => {
        const {deck_id} = req.params;
        const db = req.app.get('db');
        const result = await db.decks.get_one_users_decks([req.session.user.id, deck_id]);
        return res.status(201).send(result);
    },

    addDeck: async (req, res) => {
        const {deckName} = req.body;
        const db = req.app.get('db');
        const result = await db.decks.add_deck_to_user([deckName, req.session.user.id]);
        return res.status(201).send(result);
    },

    updateDeck: async (req, res) => {
        const {deck_id} = req.params;
        const {deckNewName} = req.body;
        const db = req.app.get('db');
        await db.decks.rename_users_deck([deckNewName, deck_id]);
        return res.sendStatus(201);
    },

    deleteDeck: async (req, res) => {
        const {deck_id} = req.params;
        const db = req.app.get('db');
        const result = await db.decks.delete_users_deck([deck_id, req.session.user.id]);
        return res.status(201).send(result);
    }
};