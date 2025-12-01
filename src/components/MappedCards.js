export default function MappedCards(props) {
    const { card, getCardIdToEdit, openDeleteCardConfirm } = props;

    return (
        <div className='mapped-cards'>
            <h5 className='mapped-cards-content'>{card.card_front}</h5>
            <h5 className='mapped-cards-content'>{card.card_back}</h5>
            <section className='mapped-cards-buttons'>
                <button
                    className='mapped-cards-edit'
                    onClick={() => getCardIdToEdit(card)}>
                    Edit Card
                </button>
                <button
                    onClick={() => openDeleteCardConfirm(card.card_id)}>
                    Delete Card
                </button>
            </section>
        </div>
    );
}
